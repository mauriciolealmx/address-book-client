import React, { Component } from 'react';
import capitalize from 'lodash/capitalize';
import { style } from 'typestyle';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { createContact, getUserContacts } from '../services';

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
  contactEmail: '',
  contactLastName: '',
  contactName: '',
  feedbackMessage: '',
};

export default class CreateContact extends Component {
  state = { ...initialState }

  handleSubmit = async () => {
    const { contactName, contactLastName, contactEmail } = this.state;
    const { userId } = this.props;

    const contact = {
      email: contactEmail.toLowerCase(),
      firstName: capitalize(contactName),
      lastName: capitalize(contactLastName),
    };

    const createdContact = await createContact(userId, contact);
    if (!createdContact) {
      this.setState({
        feedbackMessage: `Contact ${contactName} already exists.`,
      });
      return;
    }

    this.setState({
      ...initialState,
      feedbackMessage: `User ${createdContact.firstName} was added to ${userId}`,
    });
    this.updateAppState();
  }

  updateAppState = async () => {
    const { updateContacts, userId } = this.props;
    const contacts = await getUserContacts(userId);
    updateContacts(contacts);
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  render() {
    const { feedbackMessage, contactName, contactLastName, contactEmail } = this.state;
    return (
      <div>
        <form>
          <TextField
            classes={styles.textField}
            label="Name"
            margin="normal"
            onChange={event => this.handleChange('contactName', event)}
            value={contactName}
          />
          <TextField
            classes={styles.textField}
            label="Last Name"
            margin="normal"
            onChange={event => this.handleChange('contactLastName', event)}
            value={contactLastName}
          />
          <TextField
            classes={styles.textField}
            label="Email Address"
            margin="normal"
            onChange={event => this.handleChange('contactEmail', event)}
            value={contactEmail}
          />
          <Button color="primary" onClick={this.handleSubmit} variant="outlined" className={styles.button}>
            Create Contact
          </Button>
        </form>
        {feedbackMessage && <div>{feedbackMessage}</div>}
      </div>
    );
  }
}
