import React from 'react'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

class SearchForm extends React.PureComponent {
  render() {
    return (
      <div className='search'>
        <form className='search__form'>
          <input className='search__input' placeholder='Фильм'></input>
          <button className='search__btn'></button>
        </form>
        <FilterCheckbox />
      </div>
    )
  }
}

export default SearchForm
