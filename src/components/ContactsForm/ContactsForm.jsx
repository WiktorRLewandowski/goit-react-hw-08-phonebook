import css from './ContactsForm.module.css'
import PropTypes from 'prop-types'
import Notiflix from "notiflix";
import { selectContacts } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';

export const ContactForm = () => {

  const dispatch = useDispatch()
  const contacts = useSelector(selectContacts)

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

    return (
      <form onSubmit={handleSubmit} className={css.form}>
          <label className={css.label}>Name:
            <input
              type="text"
              name="name"
              className={css.input}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label className={css.label}>Number:
            <input
              type="tel"
              name="number"
              className={css.input}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button className={css.btn} type="submit">Add contact</button>
        </form>
      )
  }
  
  ContactForm.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    name: PropTypes.string,
    number: PropTypes.string,
  }