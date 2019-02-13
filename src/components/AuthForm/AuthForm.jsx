import React, { Component } from 'react';
import capitalize from 'lodash/capitalize';

import ActionForm from './ActionForm';
import viewConfig from './authForm.config';
import { login, createAccount } from '../../services';

const getEmailId = email => email.split('@')[0];

export default class AuthForm extends Component {
  state = {
    serverError: '',
    successMessage: '',
    showSignIn: true,
  };

  toggleActionFrom = () => {
    this.setState(state => ({ showSignIn: !state.showSignIn }));
  };

  handleSubmit = async (action, user) => {
    if (action === 'login') {
      this.login(user);
    } else if (action === 'register') {
      this.register(user);
    }
  };

  login = async user => {
    // TODO: Need the error message.
    // console.error(`Unable to login user ${user.email}`, err.message);
    const { email } = await login(user);
    const userId = capitalize(getEmailId(email));
    this.updateAppState(userId);
  };

  register = async user => {
    try {
      const { email } = await createAccount(user);
      this.setState({
        serverError: '',
        successMessage: `Registered user ${email}`,
      });
    } catch (e) {
      const { data } = e.response;
      this.setState({
        serverError: data.error,
        successMessage: '',
      });
    }
  };

  updateAppState = userId => {
    const { updateUserId } = this.props;
    updateUserId(userId);
  };

  render() {
    const { successMessage, serverError, showSignIn } = this.state;

    const action = showSignIn ? 'login' : 'register';
    const actionFormProps = {
      ...viewConfig[action],
      alternativeButtonAction: this.toggleActionFrom,
    };

    return (
      <div>
        <ActionForm {...actionFormProps} onSubmit={user => this.handleSubmit(action, user)} />
        {successMessage && <div>{successMessage}</div>}
        {serverError && <div>{serverError}</div>}
        {/* {!this.state.isValidEmail && <div>Please Enter a valid Email address</div>} */}
      </div>
    );
  }
}
