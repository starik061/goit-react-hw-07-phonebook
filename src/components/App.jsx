import { AddContactForm } from './AddContactForm/AddContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContacts,
} from '../redux/contactsSlice';
import { filtered } from '../redux/filterSlice';
import { useEffect } from 'react';

export const App = () => {
  //----------------------------------------------------------------
  const contacts = useSelector(store => {
    return store.contacts.items;
  });

  const filterState = useSelector(store => {
    return store.filtered;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //----------------------------------------------------------------

  const addContactFunction = formState => {
    const { name, number } = formState;
    const contact = { name, phone: number };

    let isNameInContacts = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameInContacts) {
      alert('Такое имя уже существует в контактах');
      return;
    }

    dispatch(addContactThunk(contact));
  };

  const changeFilter = event => {
    dispatch(filtered(event.target.value));
  };

  const deleteContact = contactId => {
    dispatch(deleteContactThunk(contactId));
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
