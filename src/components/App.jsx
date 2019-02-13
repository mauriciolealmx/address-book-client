import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import AddressBook from './AddressBook/AddressBook';
import AuthForm from './AuthForm/AuthForm';
import Header from './Header/Header';
import './App.css';

const initialState = {
  userContacts: [],
  userId: '',
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
  };

  isLoggedIn = () => {
    const { userId } = this.state;
    return !!userId;
  };

  logOut = () => {
    this.setState(cloneDeep(initialState));
  };

  render() {
    const { userId, userContacts, signIn } = this.state;
    const isLoggedIn = this.isLoggedIn();
    return (
      <div className="App">
        <Header userId={userId} isLoggedIn={this.isLoggedIn()} logOut={this.logOut} />
        <div className="App-content">
          {isLoggedIn ? (
            <AddressBook userId={userId} userContacts={userContacts} />
          ) : (
            <AuthForm updateUserId={this.updateUserId} />
          )}
        </div>
      </div>
    );
  }
}
