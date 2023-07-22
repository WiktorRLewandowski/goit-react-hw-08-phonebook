import { createReducer } from "@reduxjs/toolkit"
import { addContact, deleteContact, filterChange } from "./actions"

const TEST_CONTACTS = [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
]

const storageContacts = JSON.parse(localStorage.getItem('contacts'))
const storageOrInitial = !storageContacts || !storageContacts[0] ? [...TEST_CONTACTS] : storageContacts

const INITIAL_CONTACTS = {
    contacts: [
        ...storageOrInitial     
    ],
    filter: "",
}

export const rootReducer = createReducer(INITIAL_CONTACTS, {
    [addContact]: (state, action) => {
       state.contacts.push(action.payload)
        localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    [deleteContact]: (state, action) => {
        state.contacts = state.contacts.filter(
            contact => contact.id !== action.payload)
        localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    [filterChange]: (state, action) => {
        state.filter = action.payload
    }
})


// export const rootReducer = (state = INITIAL_CONTACTS, action) => {
//     switch(action.type) {
//         case addContact.type: 
//             return {
//                 ...state,
//                 contacts: [
//                     ...state.contacts,
//                     action.payload
//                 ]
//             }

//         case deleteContact.type:
//             return {
//                 ...state,
//                 contacts: state.contacts.filter(contact => contact.id !== action.payload)                
//             }
//         case filterChange.type:
//             return {
//                 ...state,
//                 filter: action.payload
//             }
//         default: 
//         return state
//     }
// }