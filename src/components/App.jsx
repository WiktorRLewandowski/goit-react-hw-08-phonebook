import { ContactList } from "./ContactList";
import { ContactForm } from "./ContactsForm";
import { Filter } from "./Filter";
// import { fetchContacts } from "redux";
import Notiflix from "notiflix";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "redux/slices/contactSlice";
import { deleteContact } from "redux/slices/contactSlice";
import { filterChange } from "redux/slices/filterSlice";
import { getContacts, getFilter } from "redux/selectors";
// import { useEffect } from "react";


export default function App() {
  const filter = useSelector(getFilter)
  const contacts = useSelector(getContacts)

  const dispatch = useDispatch()

  // useEffect(()=> {
  //   dispatch(fetchContacts())
  // }, [dispatch])


  const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target
    const name = form.elements.name.value
    const number = form.elements.number.value

    if (contacts?.some((contact)=> contact.name.toLowerCase() === name.toLowerCase())) {
      return Notiflix.Notify.failure(`${name} is already in the books!`)
    }

    dispatch(addContact(name, number))

    form.reset()
  }


  const handleFilterChange = e => {
    dispatch(filterChange(e.target.value))
    // console.log(e.target.value)
  }

  const handleDelete = e => {
    dispatch(deleteContact(e.target.id))
    // console.log(e.target.id)
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
      {/* {getIsLoading && <p>Loading contacts...</p>}
      {getError && <p>{getError}</p> }
      {<p>{contacts?.length > 0 && JSON.stringify(contacts, null, 2)}</p>} */}
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