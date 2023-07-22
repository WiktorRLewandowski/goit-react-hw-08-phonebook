// import { useState } from "react";
import { ContactList } from "./ContactList";
import { ContactForm } from "./ContactsForm";
import { Filter } from "./Filter";
import Notiflix from "notiflix";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact, filterChange } from "redux/actions";
import { getContacts, getFilter } from "redux/selectors";
import { store } from "redux/store";

// const INITIAL_CONTACTS = [
//     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//     {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
// ]

// const localStorageItems = JSON.parse(localStorage.getItem('contacts'))
// const storageOrInitial = () => !localStorageItems || !localStorageItems[0] ? [...INITIAL_CONTACTS] : localStorageItems

export default function App() {
  // const [contacts, setContacts] = useState(()=> storageOrInitial())
  // const [filter, setFilter] = useState('')
  const filter = useSelector(getFilter)
  const contacts = useSelector(getContacts)
  const dispatch = useDispatch()
  
  // function localStorageSaver() {
  //   localStorage.setItem("contacts", JSON.stringify(contacts));
  // }
  // localStorageSaver()

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target
    const name = form.elements.name.value
    const number = form.elements.number.value

    if (contacts.some((contact)=> contact.name.toLowerCase() === name.toLowerCase())) {
      return Notiflix.Notify.failure(`${name} is already in the books!`)
    }
    localStorage.setItem('contacts', JSON.stringify(contacts))
    dispatch(addContact(name, number))

    // setContacts((prevState)=> (
    //       [
    //         ...prevState,
    //         {
    //           id: crypto.randomUUID(),
    //           name: name,
    //           number: number,
    //         }
    //       ]          
    //   )
    // )
    
    form.reset()
  }


  const handleFilterChange = e => {
    dispatch(filterChange(e.target.value))
  }

  // const handleNameChange = e => {
  //   setName(e.target.value)
  // }

  // const handleNumberChange = e => {
  //   setNumber(e.target.value)
  // }

  const handleDelete = (ev) => {
    
    dispatch(deleteContact(ev.target.id))
    // localStorage.setItem('contacts', JSON.stringify(contacts))
    // setContacts((prevState)=> ([
    //   ...prevState.filter(prev => prev.id !== ev.target.id)
    // ]

    // ))
  }

  store.subscribe(()=> localStorage.setItem('contacts', JSON.stringify(contacts)))

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: '2rem',
        color: '#010101'
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit}/>
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange}/>
      <ContactList contacts={contacts} filter={filter} handleDelete={handleDelete}/>
    </div>
    )
}

App.propTypes = {
  user: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  number: PropTypes.string,
  filter: PropTypes.string
}