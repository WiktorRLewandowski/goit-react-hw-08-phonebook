import Notiflix from "notiflix";
import PropTypes from 'prop-types'

import { ContactList } from "./ContactList";
import { ContactForm } from "./ContactsForm";
import { Filter } from "./Filter";
import { Loader } from "./Loader"

import { fetchContacts } from "redux/operations";

import { useDispatch, useSelector } from "react-redux";

// import { addContact, deleteContact } from "redux/slices/contactSlice";
import { addContact, deleteContact } from "redux/operations";
import { filterChange } from "redux/slices/filterSlice";
import { 
  selectContacts, 
  selectFilter, 
  selectIsLoading, 
  selectError 
    } from "redux/selectors";
import { useEffect } from "react";


export default function App() {
  const filter = useSelector(selectFilter)
  const contacts = useSelector(selectContacts)
  const error = useSelector(selectError)
  const isLoading = useSelector(selectIsLoading)

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(fetchContacts())
  }, [dispatch])


  const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target
    const name = form.elements.name.value
    const number = form.elements.number.value

    if (contacts?.some((contact)=> contact.name.toLowerCase() === name.toLowerCase())) {
      return Notiflix.Notify.failure(`${name} is already in the books!`)
    }

    dispatch(addContact({name, number}))

    form.reset()
  }


  const handleFilterChange = e => {
    dispatch(filterChange(e.target.value))
  }

  const handleDelete = e => {
    dispatch(deleteContact(e.target.id))
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: '1.5rem',
        color: '#010101'
      }}
    >
      {/* { isLoading && <p>Loading contacts...</p>} */}
      { error && <p> {error} </p> }
      <h2><span style={{color: 'indigo'}}>Phone</span>book</h2>
      <ContactForm onSubmit={handleSubmit}/>
      <h3>Contacts</h3>
      <Filter filter={filter} onChange={handleFilterChange}/>
      {!isLoading ? <ContactList contacts={contacts} filter={filter} handleDelete={handleDelete}/> : <Loader/>}
    </div>
    )
}

App.propTypes = {
  user: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  number: PropTypes.string,
  filter: PropTypes.string
}