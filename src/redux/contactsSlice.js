import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [{ id: 555, name: 'John', number: 1 }],
  isLoading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    removeContact: (state, action) => {
      state.items = state.items.filter(
        contact => action.payload !== contact.id
      );
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;

export default contactsSlice.reducer;
