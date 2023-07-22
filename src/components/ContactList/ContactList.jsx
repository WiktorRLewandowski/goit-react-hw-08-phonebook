import css from './ContactList.module.css'
import PropTypes from 'prop-types'

export const ContactList = ({contacts, filter, handleDelete}) => {
  if (contacts) {
  return (
    <ul className={css.list}>
      {contacts.map(({id, name, number}) => { 
        return(
          name.toLowerCase().includes(filter.toLowerCase()) 
          ? <li key={id} className={css.item}>
              {name}: {number}
              <button id={id} className={css.btn} onClick={handleDelete}>
                Delete contact
              </button>
            </li>
          : ''
      )}
        )
      }
    </ul>
  )
}
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  handleDelete: PropTypes.func,
}
