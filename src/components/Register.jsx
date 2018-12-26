import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function createAccount(user) {
  return axios
    .post('/register', user)
    .then(res => res.data)
    .catch(err => console.error(`Could not register user: ${err}`));
}

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      serverError: '',
      successMessage: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit() {
    const { email, password } = this.state;
    const user = { email, password };

    createAccount(user)
      .then(user => {
        const { email } = user;
        this.setState({
          successMessage: `Registered user ${email}`,
        });
      })
      .catch(err => {
        const serverError = `Could not register user: ${err}`;
        console.error(serverError);
        this.setState({
          serverError,
        });
      });
  }

  render() {
    const { serverError, successMessage } = this.state;

    return (
      <div style={{ display: 'inline-block' }}>
        <form noValidate autoComplete="off">
          <TextField
            autoComplete="email"
            fullWidth
            label="Email"
            margin="normal"
            onChange={event => this.handleChange('email', event)}
            value={this.state.email}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            onChange={event => this.handleChange('password', event)}
            type="password"
            value={this.state.password}
          />
          <Button color="primary" onClick={this.handleSubmit} variant="outlined" fullWidth>
            Submit
          </Button>
        </form>
        {serverError && <div>{serverError}</div>}
        {successMessage && (
          <div>
            <div>Thanks for registering</div>
            <div>{successMessage}</div>
          </div>
        )}
      </div>
    );
  }
}
