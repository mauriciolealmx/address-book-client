import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class CreateContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      successMessage: '',
      contactName: '',
      contactLastName: '',
      contactEmail: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { userId, contactName, contactLastName, contactEmail } = this.state;
    const contact = {
      email: contactEmail,
      firstName: contactName,
      lastName: contactLastName,
    };
    axios
      .post(`/users/${userId}/contacts`, contact)
      .then(res => {
        const { firstName } = res.data;
        this.setState({
          successMessage: `User ${firstName} was added to ${userId}`,
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
    const { successMessage } = this.state;
    return (
      <div>
        <form>
          <TextField
            id="standard-text"
            label="User Id"
            onChange={event => this.handleChange('userId', event)}
            value={this.state.userId}
            margin="normal"
          />
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
        {successMessage && <div>{successMessage}</div>}
      </div>
    );
  }
}
