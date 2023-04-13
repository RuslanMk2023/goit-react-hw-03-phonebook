import { Component } from 'react';

import { ContactForm, Filter, ContactList } from 'components';

import styles from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filterValue: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    contacts && this.setState({ contacts: JSON.parse(contacts) });
  }

  componentDidUpdate() {
    this.updContactsLocalStorage;
  }

  setFilterValue = evn => this.setState({ filterValue: evn.target.value });

  addNewContact = newContactObj =>
    this.setState({ contacts: [...prevState.contacts, newContactObj] });

  deleteContact = id =>
    this.setState({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    });

  getContactsForShow = () => {
    const { contacts, filterValue } = this.state;

    if (filterValue === '') return contacts;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterValue.trim().toLowerCase())
    );
  };

  updContactsLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

  render() {
    const { contacts, filterValue } = this.state;

    return (
      <div className={styles.mainWrapper}>
        <h1> Phonebook: </h1>
        <ContactForm addNewContact={this.addNewContact} contacts={contacts} />

        <h2> Contacts </h2>
        <div className={styles.contentWrepper}>
          <Filter
            filterValue={filterValue}
            setFilterValue={this.setFilterValue}
          />
          <ContactList
            deleteContact={this.deleteContact}
            contacts={this.getContactsForShow()}
          />
        </div>
      </div>
    );
  }
}
