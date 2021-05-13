import React from 'react'
import CurrentMoviesContext from '../../contexts/CurrentMoviesContext'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'

class SavedMovies extends React.PureComponent {
  static contextType = CurrentMoviesContext
  render() {
    console.log('SAVED MOVIES PROPS', this.props)
    console.log('SAVED MOVIES CONTEXT', this.context)
    return (
      <div className='movies'>
        <SearchForm clearError={this.props.clearError} loading={this.props.loading} getMovie={this.props.getMovie} />
        <MoviesCardList deleteMovie={this.props.deleteMovie} errorMessage={this.props.errorMessage} movies={this.context} path={this.props.path} />
      </div>
    )
  }
}

export default SavedMovies
