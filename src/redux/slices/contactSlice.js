import { createSlice } from "@reduxjs/toolkit";
import { deleteContact, fetchContacts } from "redux/operations";
import { addContact } from "redux/operations";

const pendingHandler = state => {
    state.isLoading = true
}

const rejectedHandler = (state, action) => {
    state.isLoading = false;
    state.error = action.payload
}

export const contactSlice = createSlice({
    name: "contacts",
    initialState: {
        contacts: [],
        isLoading: false,
        error: null
    },
    extraReducers: {
        [fetchContacts.pending]: pendingHandler,
        [addContact.pending]: pendingHandler,
        [deleteContact.pending]: pendingHandler,
        [fetchContacts.rejected]: rejectedHandler,
        [addContact.rejected]: rejectedHandler,
        [deleteContact.rejected]: rejectedHandler,
        [fetchContacts.fulfilled] (state, action) {
            state.isLoading = false;
            state.error = null;
            state.contacts = action.payload;
        },
        [addContact.fulfilled] (state, action) {
            state.isLoading = false;
            state.error = null;
            state.contacts.push(action.payload)
        },
        [deleteContact.fulfilled] (state, action) {
            state.isLoading = false;
            state.error = null;
            const index = state.contacts.findIndex(
                contact => contact.id === action.payload.id
            )
            state.contacts.splice(index, 1);
        },        
    }
})

export const contactReducer = contactSlice.reducer