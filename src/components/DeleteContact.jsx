import React, { Component } from 'react';
import axios from 'axios';
import capitalize from 'lodash/capitalize';
import { style } from 'typestyle';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { deleteContact, getUserContacts } from '../services';

const styles = {
  textField: {
    root: style({
      marginLeft: '20px',
    }),
  },

  button: style({
    display: 'block',
    margin: 'auto',
  }),
};

const initialState = {
  contactLastName: '',
  contactName: '',
  feedbackMessage: '',
};

export default class DeleteContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { contactName, contactLastName } = this.state;
    const { userId, updateContacts } = this.props;

    const contact = {
      firstName: capitalize(contactName),
      lastName: capitalize(contactLastName),
    };

    deleteContact(userId, contact).then(res => {
      if (!res) {
        this.setState({
          feedbackMessage: 'Contact does not exist.',
        });
        return;
      }

      getUserContacts(userId).then(res => {
        updateContacts(res);
        this.setState({
          ...initialState,
        });
      });
    });
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  render() {
    const { feedbackMessage } = this.state;
    return (
      <div>
        <form>
          <TextField
            classes={styles.textField}
            label="Name"
            margin="normal"
            onChange={event => this.handleChange('contactName', event)}
            value={this.state.contactName}
          />
          <TextField
            classes={styles.textField}
            label="Last Name"
            margin="normal"
            onChange={event => this.handleChange('contactLastName', event)}
            value={this.state.contactLastName}
          />
          <Button color="primary" onClick={this.handleSubmit} variant="outlined" className={styles.button}>
            Delete Contact
          </Button>
        </form>
        {feedbackMessage && <div>{feedbackMessage}</div>}
      </div>
    );
  }
}
