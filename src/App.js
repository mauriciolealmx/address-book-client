import React, { Component } from 'react';

import CreateContact from './components/CreateContact';
import Login from './components/Login';
import logo from './logo.svg';
import Register from './components/Register';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userJwtToken: '',
      userId: '',
    };
    this.updateToken = this.updateToken.bind(this);
    this.updateUserId = this.updateUserId.bind(this);
  }

  updateToken(jwtToken) {
    this.setState({
      userJwtToken: jwtToken,
    });
  }

  updateUserId(userId) {
    this.setState({
      userId,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Register />
          <CreateContact userJwtToken={this.state.userJwtToken} userId={this.state.userId} />
          <Login updateToken={this.updateToken} updateUserId={this.updateUserId} />
        </header>
      </div>
    );
  }
}
