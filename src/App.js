import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';

import CreateContact from './components/CreateContact';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header/Header';
import Contacts from './components/Contacts/Contacts';
import './App.css';

import styles from './App.styles';

const initialState = {
  userContacts: [],
  userId: '',
  userJwtToken: '',
  signIn: true,
};
export default class App extends Component {
  constructor() {
    super();
    this.state = cloneDeep(initialState);
    this.updateToken = this.updateToken.bind(this);
    this.updateUserId = this.updateUserId.bind(this);
    this.updateContacts = this.updateContacts.bind(this);
    this.createSignInToggle = this.createSignInToggle.bind(this);
    this.logOut = this.logOut.bind(this);
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

  updateContacts(userContacts) {
    this.setState({
      userContacts,
    });
  }

  isLoggedIn() {
    const { userJwtToken, userId } = this.state;
    return userJwtToken && userId;
  }

  logOut() {
    this.setState(cloneDeep(initialState));
  }

  createSignInToggle() {
    this.setState(prevState => ({ signIn: !prevState.signIn }));
  }

  render() {
    const { userJwtToken, userId, userContacts, signIn } = this.state;
    const hasContacts = userContacts.length > 0;
    const isLoggedIn = this.isLoggedIn();
    return (
      <div className="App">
        <Header userId={userId} isLoggedIn={this.isLoggedIn()} logOut={this.logOut} />
        <div className="App-header">
          {isLoggedIn ? (
            <CreateContact userJwtToken={userJwtToken} userId={userId} updateContacts={this.updateContacts} />
          ) : (
            <Paper classes={{ root: styles.root }}>
              {signIn ? (
                <React.Fragment>
                  <h1>Sign In</h1>
                  <Login
                    updateToken={this.updateToken}
                    updateUserId={this.updateUserId}
                    updateContacts={this.updateContacts}
                  />
                  <CardContent>
                    <Button onClick={this.createSignInToggle} color="primary">
                      Create account
                    </Button>
                  </CardContent>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h1>Create Account</h1>
                  <Register />
                  <CardContent>
                    <Button onClick={this.createSignInToggle} color="primary">
                      Sign In
                    </Button>
                  </CardContent>
                </React.Fragment>
              )}
            </Paper>
          )}
          <hr />
          {hasContacts && <Contacts contacts={userContacts} />}
        </div>
      </div>
    );
  }
}
