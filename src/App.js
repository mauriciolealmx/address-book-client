import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      respEmail: '',
      respPassword: '',
      serverError: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };

    axios
      .post('/register', user)
      .then(res => {
        const { email, password } = res.data;
        this.setState({
          respEmail: email,
          respPassword: password,
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
    const { respEmail, respPassword, serverError } = this.state;
    const hasResponseData = respEmail && respPassword;
    const showResponseData = hasResponseData && !serverError;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
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
              type="submit"
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
          {showResponseData && (
            <div>
              <div>Thanks for registering</div>
              <div>Registered Email: {respEmail}</div>
              <div>Registered Password: {respPassword}</div>
            </div>
          )}
        </header>
      </div>
    );
  }
}
