import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addContactToDatabase,
  getContacts,
  removeContactFromDatabase,
} from 'contactsAPI/fetchContactsAPI';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

//----------------------------------------------------------------
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getContacts();
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const response = await addContactToDatabase(contact);
      console.log(response);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue, dispatch }) => {
    try {
      await removeContactFromDatabase(contactId);
      dispatch(removeContact(contactId));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//----------------------------------------------------------------

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    removeContact: (state, action) => {
      state.items = state.items.filter(
        contact => action.payload !== contact.id
      );
    },
  },
  extraReducers: {
    [fetchContacts.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //---------------------------------------------------------------
    [addContactThunk.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [addContactThunk.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContactThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //---------------------------------------------------------------
    [deleteContactThunk.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteContactThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
    },
    [deleteContactThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;

export default contactsSlice.reducer;
