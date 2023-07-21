import { nanoid } from '@reduxjs/toolkit';

import { AddContactForm } from './AddContactForm/AddContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, removeContact } from '../redux/contactsSlice';
import { filtered } from '../redux/filterSlice';

export const App = () => {
  const contacts = useSelector(store => {
    return store.contacts.items;
  });

  const filterState = useSelector(store => {
    return store.filtered;
  });

  const dispatch = useDispatch();

  const addContactFunction = formState => {
    const { name, number } = formState;
    const contact = { name, number, id: nanoid(4) };

    let isNameInContacts = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameInContacts) {
      alert('Такое имя уже существует в контактах');
      return;
    }

    dispatch(addContact(contact));
  };

  const changeFilter = event => {
    dispatch(filtered(event.target.value));
  };

  const deleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  const filteredContacts = contacts.filter(contact =>
    contact?.name.toLowerCase().includes(filterState.toLowerCase())
  );

  return (
    <>
      <h1>Phonebook</h1>
      <AddContactForm onAddContact={addContactFunction} />
      <h2>Contacts</h2>
      <Filter changeValue={changeFilter} value={filterState} />
      <ContactsList
        contacts={filteredContacts}
        onDeleteButton={deleteContact}
      />
    </>
  );
};
