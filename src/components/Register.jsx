import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

    axios
      .post('/register', user)
      .then(res => {
        const { email } = res.data;
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
            id="standard-email"
            label="Email"
            onChange={event => this.handleChange('email', event)}
            value={this.state.email}
            margin="normal"
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="text"
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
              margin: 'auto',
              width: '100%',
            }}
          >
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
