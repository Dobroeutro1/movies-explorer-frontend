import React from 'react'

class FilterCheckbox extends React.PureComponent {
  render() {
    return (
      <div className='filter-checkbox'>
        <p className='filter-checkbox__text'>Короткометражки</p>
        <input className='filter-checkbox__input' id='checkbox' type='checkbox' />
        <label className='filter-checkbox__label' htmlFor='checkbox'></label>
      </div>
    )
  }
}

export default FilterCheckbox
