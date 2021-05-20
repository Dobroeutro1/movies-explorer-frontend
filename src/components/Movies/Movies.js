import React from 'react'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { filterMovies } from '../../utils/utils'

class Movies extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      filteredMovies: [],
      value: '',
      short: false,
      errorMessage: { value: '', type: '' },
    }
  }

  componentDidMount() {
    localStorage.setItem('path', '/movies')
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.setState({ filteredMovies: [] }, this.findMovie)
      // this.findMovie()
    }

    if (prevState.short !== this.state.short) {
      // this.setState((prev) => {
      //   return { ...prev, errorMessage: { value: '', type: '' } }
      // })
      this.filterWithShort()
      // this.findMovie()
    }
  }

  filterWithShort = () => {
    const filterShort = this.state.filteredMovies.filter(
      (movie) => movie.duration < 41
    )
    this.setState({ filteredMovies: filterShort })
  }

  findMovie = () => {
    const filter = filterMovies(
      this.props.loadingMovies,
      this.props.savedMovies,
      this.state.value,
      this.state.short
    )

    // console.log('FILTER', filter)

    if (filter.length < 1) {
      return this.setState((prev) => {
        return {
          ...prev,
          filteredMovies: [],
          errorMessage: {
            value: 'Ничего не найдено :)',
            type: 'filter',
          },
        }
      })
    }

    return this.setState((prev) => {
      return {
        ...prev,
        filteredMovies: filter,
        errorMessage: { value: '', type: '' },
      }
    })
  }

  handleShortMovie = () => {
    this.setState({ short: !this.state.short })
  }

  handleMovieValue = (value) => {
    this.setState({ value: value })
  }

  clearMovies = () => {
    this.setState({ filteredMovies: [] })
  }

  render() {
    console.group('MOVIES')
    console.log('PROPS', this.props)
    console.log('STATE', this.state)
    console.groupEnd()
    return (
      <div className="movies">
        <SearchForm
          clearMovies={this.clearMovies}
          loading={this.props.loading}
          handleShortMovie={this.handleShortMovie}
          handleMovieValue={this.handleMovieValue}
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
