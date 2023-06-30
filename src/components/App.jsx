import { Component } from "react";
import { ContactList } from "./ContactList";
import { ContactForm } from "./ContactsForm";
import { Filter } from "./Filter";
import Notiflix from "notiflix";
import PropTypes from 'prop-types'

const INITIAL_STATE = {
  name: '',
  number: '',
  filter: '',
}

class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    ...INITIAL_STATE
  }

  static propTypes = {
    user: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    number: PropTypes.string,
    filter: PropTypes.string
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { contacts } = this.state
    const form = ev.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    if (contacts.some((contact)=> contact.name.toLowerCase() === name.toLowerCase())) {
      return Notiflix.Notify.failure(`${name} is already in the books!`)
    }
    // console.log(name, number)
    // this.setState(({contacts}) => {
    //   return (
    //     contacts.push({id:crypto.randomUUID(), name:name, number:number})        
    //   )
    // });


    this.setState((prevState) => ({
      contacts: [
        ...prevState.contacts,
        {
          id:crypto.randomUUID(),
          name:name,
          number: number,
        }
      ]
    })
    )
    this.reset()
  }

  reset = () => {this.setState(prevState => ({
    ...prevState.contacts, ...INITIAL_STATE
  }))}

  handleChange = (ev) => {
    const {value, name} = ev.target
    this.setState({[name]: value})
  }

  handleDelete = (ev) => {
    const { contacts } = this.state
    const contactToDelete = contacts.filter(contact=> contact.id === ev.target.id)
    this.setState(contacts.splice(contacts.indexOf(contactToDelete[0]), 1))
  }

  render() {
    const { contacts, name, number, filter } = this.state
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
        <ContactForm onSubmit={this.handleSubmit} onChange={this.handleChange} name={name} number={number}/>
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleChange}/>
        <ContactList contacts={contacts} filter={filter} handleDelete={this.handleDelete}/>
      </div>
      )
    }
}


export default App