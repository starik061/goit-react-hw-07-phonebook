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
      return rejectWithValue(err.response.data);
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
    [fetchContacts.pending]: (state, action) => {},
    [fetchContacts.fulfilled]: (state, action) => {
      console.log('reducer', action.payload);
      state.items = action.payload;
    },
    [fetchContacts.rejected]: (state, action) => {},
  },
});

export const { addContact, removeContact } = contactsSlice.actions;

export default contactsSlice.reducer;
