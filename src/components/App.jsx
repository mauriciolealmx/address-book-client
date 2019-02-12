import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import Header from './Header/Header';
import Login from './Login';
import Register from './Register';
import './App.css';
import AddressBook from './AddressBook/AddressBook';

const initialState = {
  userContacts: [],
  userId: '',
  signIn: true,
};

export default class App extends Component {
  constructor() {
    super();
    this.state = cloneDeep(initialState);
  }

  updateUserId = userId => {
    this.setState({
      userId,
    });
  }

  isLoggedIn = () => {
    const { userId } = this.state;
    return !!userId;
  }

  logOut = () => {
    this.setState(cloneDeep(initialState));
  }

  createSignInToggle = () => {
    this.setState(prevState => ({ signIn: !prevState.signIn }));
  }

  render() {
    const { userId, userContacts, signIn } = this.state;
    const isLoggedIn = this.isLoggedIn();
    return (
      <div className="App">
        <Header userId={userId} isLoggedIn={this.isLoggedIn()} logOut={this.logOut} />
        <div className="App-content">
          {isLoggedIn ? (
            <AddressBook userId={userId} userContacts={userContacts} />
          ) : signIn ? (
            <Login updateUserId={this.updateUserId} alternativeButtonAction={this.createSignInToggle} />
          ) : (
            <Register alternativeButtonAction={this.createSignInToggle} />
          )}
        </div>
      </div>
    );
  }
}
