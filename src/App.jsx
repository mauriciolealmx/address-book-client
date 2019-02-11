import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CreateContact from './components/CreateContact';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header/Header';
import Contacts from './components/Contacts/Contacts';
import DeleteContact from './components/DeleteContact';
import './App.css';

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

  updateContacts = userContacts => {
    this.setState({
      userContacts,
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
    const hasContacts = userContacts.length > 0;
    const isLoggedIn = this.isLoggedIn();
    return (
      <div className="App">
        <Header userId={userId} isLoggedIn={this.isLoggedIn()} logOut={this.logOut} />
        <div className="App-header">
          {isLoggedIn ? (
            <React.Fragment>
              <CreateContact userId={userId} updateContacts={this.updateContacts} />
              <DeleteContact userId={userId} updateContacts={this.updateContacts} />
            </React.Fragment>
          ) : (
            <Paper classes={{ root: styles.root }}>
              {signIn ? (
                <React.Fragment>
                  <Typography component="h1" variant="h5" style={{ padding: '35px' }}>
                    Sign in
                  </Typography>
                  <Login
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
                  <Typography component="h1" variant="h5" style={{ padding: '35px' }}>
                    Create account
                  </Typography>
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
