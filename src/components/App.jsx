import { useState } from "react";
import { ContactList } from "./ContactList";
import { ContactForm } from "./ContactsForm";
import { Filter } from "./Filter";
import Notiflix from "notiflix";
import PropTypes from 'prop-types'

const INITIAL_CONTACTS = [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
]

const localStorageItems = JSON.parse(localStorage.getItem('contacts'))
const storageOrInitial = () => !localStorageItems || !localStorageItems[0] ? [...INITIAL_CONTACTS] : localStorageItems

export default function App() {
  const [contacts, setContacts] = useState(()=> storageOrInitial())
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  function localStorageSaver() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
  localStorageSaver()

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (contacts.some((contact)=> contact.name.toLowerCase() === name.toLowerCase())) {
      return Notiflix.Notify.failure(`${name} is already in the books!`)
    }

    setContacts((prevState)=> (
    [
            ...prevState,
            {
              id: crypto.randomUUID(),
              name: name,
              number: number,
            }
          ]          
      )
    )
    setName('')
    setNumber('')
  }


  const handleFilterChange = e => {
    setFilter(e.target.value)
  }

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const handleNumberChange = e => {
    setNumber(e.target.value)
  }

  const handleDelete = (ev) => {
    setContacts((prevState)=> ([
      ...prevState.filter(prev => prev.id !== ev.target.id)
    ]

    ))
  }

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
      <ContactForm onSubmit={handleSubmit} onNameChange={handleNameChange} onNumberChange={handleNumberChange} name={name} number={number}/>
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