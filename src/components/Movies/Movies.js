import React from 'react'
import CurrentMoviesContext from '../../contexts/CurrentMoviesContext'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { filterMovies } from '../../utils/utils'

class Movies extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      filteredMovies: [],
      errorMessage: { value: '', type: '' },
    }
  }

  static contextType = CurrentMoviesContext

  componentDidUpdate = (prevProps) => {
    if (prevProps.movieValue !== this.props.movieValue) {
      this.setState((prev) => {
        return { ...prev, errorMessage: { value: '', type: '' } }
      })
      this.findMovie()
    }

    if (prevProps.shortMovie !== this.props.shortMovie) {
      this.setState((prev) => {
        return { ...prev, errorMessage: { value: '', type: '' } }
      })
      this.findMovie()
    }
  }

  findMovie = () => {
    const filter = filterMovies(this.context.loadingMovies, this.context.savedMovies, this.props.movieValue, this.props.shortMovie)

    if (filter.length < 1) {
      return this.setState((prev) => {
        return {
          ...prev,
          filteredMovies: [],
          errorMessage: {
            ...prev.errorMessage,
            value: 'Ничего не найдено :)',
            type: 'filter',
          },
        }
      })
    }

    this.setState((prev) => {
      return {
        ...prev,
        filteredMovies: filter,
        errorMessage: { value: '', type: '' },
      }
    })
  }

  render() {
    console.group('MOVIES')
    console.log('PROPS', this.props)
    console.log('STATE', this.state)
    console.log('CONTEXT', this.context)
    console.groupEnd()
    return (
      <div className='movies'>
        <SearchForm
          clearError={this.props.clearError}
          loading={this.props.loading}
          handleShortMovie={this.props.handleShortMovie}
          handleMovieValue={this.props.handleMovieValue}
        />
        <MoviesCardList
          deleteMovie={this.props.deleteMovie}
          addMovie={this.props.addMovie}
          errorMessage={this.state.errorMessage}
          movies={this.state.filteredMovies}
          path={this.props.path}
        />
      </div>
    )
  }
}

export default Movies
