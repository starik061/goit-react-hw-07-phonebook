import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, newContact) => {
      return [...state.items, newContact.payload];
    },
    removeContact: (state, contactToRemove) => {
      return state.items.filter(
        contact => contactToRemove.payload !== contact.id
      );
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;

export default contactsSlice.reducer;
