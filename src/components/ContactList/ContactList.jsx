import css from './ContactList.module.css'
import PropTypes from 'prop-types'
import { FaUser, FaPhone } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { selectContacts, selectFilter } from 'redux/selectors'
import { deleteContact } from 'redux/operations'

export const ContactList = () => {
  const dispatch = useDispatch()
  const contacts = useSelector(selectContacts)
  const filter = useSelector(selectFilter)

  const handleDelete = e => {
    dispatch(deleteContact(e.target.id))
  }

  if (contacts) {
    return (
      <ul className={css.list}>
        {contacts.map(({id, name, number, phone }) => { 
          return (
            name.toLowerCase().includes(filter.toLowerCase()) 
            ? <li key={id} className={css.item}>
                <p className={css.name}><FaUser className={css.user}/>{name}:</p> 
                <p className={css.number}><FaPhone className={css.phone}/>{number || phone}</p>
                <button id={id} className={css.btn} onClick={handleDelete}>
                  Delete contact
                </button>
                <hr className={css.line}/>
              </li>
            : ''
          )
        })}
      </ul>
    )
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  handleDelete: PropTypes.func,
}
