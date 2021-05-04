import React from 'react'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'

class SavedMovies extends React.PureComponent {
  render() {
    return (
      <div className='movies'>
        <SearchForm />
        <MoviesCardList />
      </div>
    )
  }
}

export default SavedMovies
