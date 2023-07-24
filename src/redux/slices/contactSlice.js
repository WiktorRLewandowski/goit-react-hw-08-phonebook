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



// const TEST_CONTACTS = [
//     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//     {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
// ]

// const storageContacts = JSON.parse(localStorage.getItem('contacts'))
// const storageOrInitial = !storageContacts || !storageContacts[0] ? [...TEST_CONTACTS] : storageContacts

// const INITIAL_CONTACTS = {
//     contacts: [
//         ...storageOrInitial     
//     ],
// }

// const contactSlice = createSlice({
//     name: "contacts",
//     initialState: INITIAL_CONTACTS,
//     reducers: {
//         addContact: {
//             reducer(state, action) {
//                 state.contacts.push(action.payload)
//                 localStorage.setItem('contacts', JSON.stringify(state.contacts))
//             },
//             prepare(name, number) {
//                 return {
//                     payload: {
//                         id: crypto.randomUUID(),
//                         name,
//                         number
//                     }
//                 }
//             }
//         },

//         deleteContact (state, action) {
//             state.contacts = state.contacts.filter(contact => contact.id !== action.payload)
//             localStorage.setItem('contacts', JSON.stringify(state.contacts))
//         },
         
//     }
// })

// export const { addContact, deleteContact } = contactSlice.actions
// export const contactReducer = contactSlice.reducer