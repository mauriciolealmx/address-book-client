import React, { Component } from 'react';

import CreateContact from '../CreateContact';
import DeleteContact from '../DeleteContact';
import ContactsList from '../Contacts/Contacts';
import { getUserContacts } from '../../services';

export default class AddressBook extends Component {
  state = {
    userContacts: [],
    options: [true, false],
  };

  async componentDidMount() {
    const { userId } = this.props;
    const contacts = await getUserContacts(userId);
    this.setState({
      userContacts: contacts,
    });
  }

  handleSelectOption = selectedOption => {
    this.setState(state => ({
      options: state.options.map((option, idx) => {
        return idx === selectedOption;
      }),
    }));
  };

  updateContacts = userContacts => {
    this.setState({
      userContacts,
    });
  };

  render() {
    const { userContacts } = this.state;
    const { userId } = this.props;
    return (
      <React.Fragment>
        <div>
          <label>
            Create
            <input type="radio" checked={this.state.options[0]} onChange={() => this.handleSelectOption(0)} />
          </label>
          <label>
            Delete
            <input type="radio" checked={this.state.options[1]} onChange={() => this.handleSelectOption(1)} />
          </label>
        </div>
        {this.state.options[0] ? (
          <CreateContact userId={userId} updateContacts={this.updateContacts} />
        ) : (
          <DeleteContact userId={userId} updateContacts={this.updateContacts} />
        )}
        <hr />
        {userContacts.length > 0 && <ContactsList contacts={userContacts} />}
      </React.Fragment>
    );
  }
}
