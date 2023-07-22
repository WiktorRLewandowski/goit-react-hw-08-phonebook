const storageContacts = JSON.parse(localStorage.getItem('contacts'))
const TEST_CONTACTS = [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
]

const INITIAL_CONTACTS = {
    contacts: [
        ...storageContacts || TEST_CONTACTS
        
    ],
    filter: "",
}

// const localStorageItems = JSON.parse(localStorage.getItem('contacts'))
// const storageOrInitial = !localStorageItems || !localStorageItems[0] ? [INITIAL_CONTACTS] : localStorageItems

export const rootReducer = (state = INITIAL_CONTACTS, action) => {
    switch(action.type) {
        case "addContact": 
            return {
                ...state,
                contacts: [
                    ...state.contacts,
                    action.payload
                ]
            }

        case "deleteContact":
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)                
            }
        case "filterChange":
            return {
                ...state,
                filter: action.payload
            }
        default: 
        return state
    }
}