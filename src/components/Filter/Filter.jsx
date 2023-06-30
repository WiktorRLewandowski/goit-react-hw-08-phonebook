import css from './Filter.module.css'
import PropTypes from 'prop-types'

export const Filter = ({filter, onChange}) => {
    return (
      <>
      <p className={css.text}>Find contacts by name</p>
      <input 
        className={css.input}   
        type="text" 
        name="filter" 
        value={filter} 
        onChange={onChange}
        placeholder=""
        />
        
      </>
    )
  }

  Filter.propTypes = {
    filter: PropTypes.string,
    onChange: PropTypes.func
  }