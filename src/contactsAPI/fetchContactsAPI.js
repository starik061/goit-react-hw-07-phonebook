export const getContacts = async () => {
  try {
    let contacts = await fetch(
      'https://64ba30d55e0670a501d5c7d8.mockapi.io/contacts/contacts'
    );
    if (!contacts.ok) {
      throw new Error(contacts.statusText);
    }
    contacts = await contacts.json();
    console.log('🚀  contacts:', contacts);
  } catch (error) {
    console.log(error.message);
  }
};

export const addContact = async contact => {
  try {
    let request = await fetch(
      'https://64ba30d55e0670a501d5c7d8.mockapi.io/contacts/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      }
    );

    if (!request.ok) {
      throw new Error(request.statusText);
    }
  } catch (error) {
    console.log(error.message);
  }
};
