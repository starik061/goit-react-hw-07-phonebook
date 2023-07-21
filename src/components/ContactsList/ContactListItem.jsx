import React from 'react';
import { useSelector } from 'react-redux';

export const ContactsListItem = ({ contact, onDeleteButton }) => {
  const isLoading = useSelector(state => state.contacts.isLoading);

  return (
    <>
      <li>
        <span>
          {contact.name}: {contact.number}
        </span>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            onDeleteButton(contact.id);
          }}
        >
          Delete
        </button>
      </li>
    </>
  );
};
