import React from 'react'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import Preloader from '../Preloader/Preloader'

class SearchForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  onChange = (e) => {
    this.setState({ value: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('value', this.state.value)
    this.props.handleMovieValue(this.state.value)
    this.setState({ value: '' })
  }

  render() {
    return (
      <div className='search'>
        <form className='search__form'>
          <input onChange={this.onChange} required value={this.state.value} className='search__input' placeholder='Фильм'></input>
          {this.props.loading ? (
            <Preloader />
          ) : (
            <button disabled={this.state.value === ''} onClick={this.onSubmit} type='submit' className={`search__btn ${this.state.value === '' ? 'disabled' : ''}`}></button>
          )}
        </form>
        <FilterCheckbox handleShortMovie={this.props.handleShortMovie} />
      </div>
    )
  }
}

export default SearchForm
