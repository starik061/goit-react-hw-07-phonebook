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
