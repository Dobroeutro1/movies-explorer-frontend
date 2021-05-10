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
    // e.preventDefault()
    console.log('AAAAAAAAAA')
    // this.props.searchmovie(this.state.value)
  }

  render() {
    return (
      <div className="search">
        <form className="search__form">
          <input
            onChange={this.onChange}
            required
            className="search__input"
            placeholder="Фильм"
          ></input>
          {this.props.loading ? (
            <Preloader />
          ) : (
            <button
              onSubmit={this.onSubmit}
              type="button"
              className="search__btn"
            ></button>
          )}
        </form>
        <FilterCheckbox />
      </div>
    )
  }
}

export default SearchForm
