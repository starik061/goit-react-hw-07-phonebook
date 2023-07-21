import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getContacts } from 'contactsAPI/fetchContactsAPI';

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
//----------------------------------------------------------------

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
  },
});

export const { addContact, removeContact } = contactsSlice.actions;

export default contactsSlice.reducer;
