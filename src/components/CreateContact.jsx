import React, { Component } from 'react';
import axios from 'axios';
import capitalize from 'lodash/capitalize';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class CreateContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactEmail: '',
      contactLastName: '',
      contactName: '',
      feedbackMessage: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { contactName, contactLastName, contactEmail } = this.state;
    const { userJwtToken, userId } = this.props;

    const contact = {
      email: contactEmail.toLowerCase(),
      firstName: capitalize(contactName),
      lastName: capitalize(contactLastName),
      token: userJwtToken,
    };
    
    axios
      .post(`/users/${userId}/contacts`, contact)
      .then(res => {
        const { firstName } = res.data;
        const feedbackMessage = !firstName
          ? 'User needs to be Logged in order to create a contact.'
          : `User ${firstName} was added to ${userId}`;

        this.setState({
          feedbackMessage,
        });
      })
      .catch(err => {
        console.error(`Unable to create contact for ${userId}`, err.message);
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
            id="standard-text"
            label="Name"
            onChange={event => this.handleChange('contactName', event)}
            value={this.state.contactName}
            margin="normal"
            style={{ marginLeft: '20px' }}
          />
          <TextField
            id="standard-text"
            label="Last Name"
            onChange={event => this.handleChange('contactLastName', event)}
            value={this.state.contactLastName}
            margin="normal"
            style={{ marginLeft: '20px' }}
          />
          <TextField
            id="standard-text"
            label="Email Address"
            onChange={event => this.handleChange('contactEmail', event)}
            value={this.state.contactEmail}
            margin="normal"
            style={{ marginLeft: '20px' }}
          />
          <Button
            color="primary"
            onClick={this.handleSubmit}
            variant="outlined"
            style={{
              display: 'block',
              margin: 'auto',
            }}
          >
            Create Contact
          </Button>
        </form>
        {feedbackMessage && <div>{feedbackMessage}</div>}
      </div>
    );
  }
}
