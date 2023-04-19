import { Component } from 'react';

import { ContactForm, Filter, ContactList } from 'components';

import styles from './App.module.css';

export class App extends Component {
  state = {
    contacts: JSON.parse(localStorage.getItem('contacts')) || [], // Перевіряємо localStorage на наявність контактів
    filterValue: '',
  };

  componentDidUpdate( _,prevState) {
    if (prevState.contacts !== this.state.contacts) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  setFilterValue = evn => this.setState({ filterValue: evn.target.value });

  addNewContact = newContactObj => this.setState(state => ({ contacts: [...state.contacts, newContactObj] }));

  deleteContact = id => this.setState(state => ({ contacts: state.contacts.filter(contact => contact.id !== id)}));

  getContactsForShow = () => {
    const { contacts, filterValue } = this.state;

    if (filterValue === '') return contacts;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterValue.trim().toLowerCase())
    );
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
