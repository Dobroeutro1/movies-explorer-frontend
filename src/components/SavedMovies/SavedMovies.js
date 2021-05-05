import React from 'react'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'

class SavedMovies extends React.PureComponent {
  render() {
    return (
      <div className='movies'>
        <SearchForm loading={true} />
        <MoviesCardList path={this.props.path} />
      </div>
    )
  }
}

export default SavedMovies
