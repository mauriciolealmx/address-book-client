import React, { Component } from 'react';

import CreateContact from './components/CreateContact';
import Login from './components/Login';
import logo from './logo.svg';
import Register from './components/Register';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Register />
          <CreateContact />
          <Login />
        </header>
      </div>
    );
  }
}
