import css from './Filter.module.css'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilter } from 'redux/selectors'
import { filterChange } from 'redux/slices/filterSlice'

export const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(selectFilter)

  const handleFilterChange = e => {
    dispatch(filterChange(e.target.value))
  }

    return (
      <div className={css.wrapper}>
      <p className={css.text}>Find contacts by name</p>
      <input 
        className={css.input}   
        type="text" 
        name="filter" 
        value={filter} 
        onChange={handleFilterChange}
        placeholder=""
      />
        
      </div>
    )
  }

  Filter.propTypes = {
    filter: PropTypes.string,
    onChange: PropTypes.func
  }