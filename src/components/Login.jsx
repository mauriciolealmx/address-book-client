import React, { Component } from 'react';
import axios from 'axios';
import capitalize from 'lodash/capitalize';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { getUserContacts } from './GetUsers';

const getEmailId = email => email.split('@')[0];

const isValidEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export default class CreateContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValidEmail: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { email, password } = this.state;

    if (!isValidEmail(email)) {
      this.setState({
        isValidEmail: false,
      });
      return;
    }

    this.setState({
      isValidEmail: true,
    });

    const user = {
      email,
      password,
    };
    axios
      .post('/login', user)
      .then(res => {
        const { updateToken, updateUserId, updateContacts } = this.props;
        const { token, email } = res.data;

        const userId = capitalize(getEmailId(email));
        updateToken(token);
        updateUserId(userId);
        getUserContacts(token, userId).then(res => {
          updateContacts(res);
        });

        this.setState({
          successMessage: `Assigned token: ${token} for ${email}`,
        });
      })
      .catch(err => {
        console.error(`Unable to login user ${email}`, err.message);
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
      <div style={{ display: 'inline-block' }}>
        <form>
          <TextField
            id="standard-email"
            label="Email"
            onChange={event => this.handleChange('email', event)}
            value={this.state.email}
            margin="normal"
          />
          <TextField
            id="standard-password"
            label="Password"
            onChange={event => this.handleChange('password', event)}
            value={this.state.password}
            margin="normal"
            style={{ marginLeft: '20px' }}
          />
          <Button
            color="primary"
            onClick={this.handleSubmit}
            variant="outlined"
            style={{
              display: 'block',
              width: '100%',
            }}
          >
            Login
          </Button>
        </form>
        {successMessage && <div>{successMessage}</div>}
        {!this.state.isValidEmail && <div>Please Enter a valid Email address</div>}
      </div>
    );
  }
}
