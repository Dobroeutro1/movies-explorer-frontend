import React from 'react'
import CurrentMoviesContext from '../../contexts/CurrentMoviesContext'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { filterShortMovies } from '../../utils/utils'

class SavedMovies extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
    }
  }
  static contextType = CurrentMoviesContext

  componentDidMount = () => {
    this.filter()
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.shortMovie !== this.props.shortMovie) {
      this.setState((prev) => {
        return { ...prev, errorMessage: { value: '', type: '' } }
      })
      this.filter()
    }
  }

  filter = () => {
    const showFilms = filterShortMovies(
      this.context.savedMovies,
      this.context.shortMovie
    )
    this.setState((prev) => {
      return { ...prev, movies: showFilms }
    })
  }

  render() {
    console.group('SAVED MOVIES')
    console.log('PROPS', this.props)
    console.log('STATE', this.state)
    console.log('CONTEXT', this.context)
    console.groupEnd()
    return (
      <div className="movies">
        <SearchForm
          clearError={this.props.clearError}
          loading={this.props.loading}
          handleShortMovie={this.props.handleShortMovie}
          type={'saved'}
        />
        <MoviesCardList
          deleteMovie={this.props.deleteMovie}
          errorMessage={this.props.errorMessage}
          movies={this.state.movies}
          path={this.props.path}
        />
      </div>
    )
  }
}

export default SavedMovies
