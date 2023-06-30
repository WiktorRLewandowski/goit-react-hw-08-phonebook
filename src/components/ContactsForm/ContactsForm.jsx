import css from './ContactsForm.module.css'
import PropTypes from 'prop-types'

export const ContactForm = ({onSubmit, onChange, name, number}) => {
    return (
      <form onSubmit={onSubmit} className={css.form}>
          <label className={css.label}>Name:
            <input onChange={onChange}
              type="text"
              name="name"
              className={css.input}
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label className={css.label}>Number:
            <input onChange={onChange}
              type="tel"
              name="number"
              className={css.input}
              value={number}
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