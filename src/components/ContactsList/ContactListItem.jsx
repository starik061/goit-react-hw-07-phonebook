import React, {useState} from 'react';
import { useSelector } from 'react-redux';

export const ContactsListItem = ({ contact, onDeleteButton }) => {
  const [isClicked, setIsClicked] = useState(false);
  
  const isLoading = useSelector(state => state.contacts.isLoading);

  return (
    <>
      <li>
        <span>
          {contact.name}: {contact.number}
        </span>
        <button
          disabled={isLoading && isClicked}
          type="button"
          onClick={() => {
            setIsClicked(true);
            onDeleteButton(contact.id);
          }}
        >
          Delete
        </button>
      </li>
    </>
  );
};
