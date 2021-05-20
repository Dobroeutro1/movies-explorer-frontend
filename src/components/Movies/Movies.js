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
    const localMovies = localStorage.getItem('movies')
    if (localMovies) {
      this.setState({ filteredMovies: JSON.parse(localMovies) })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.findMovie()
    }

    if (prevState.short !== this.state.short && this.state.value) {
      this.findMovie()
    }
  }

  findMovie = () => {
    const filter = filterMovies(this.props.loadingMovies, this.props.savedMovies, this.state.value, this.state.short)

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

    localStorage.setItem('movies', JSON.stringify(filter))

    return this.setState({
      filteredMovies: filter,
      errorMessage: { value: '', type: '' },
    })
  }

  handleShortMovie = () => {
    this.setState({ short: !this.state.short })
  }

  handleMovieValue = (value) => {
    this.setState({ value: value })
  }

  render() {
    return (
      <div className='movies'>
        <SearchForm loading={this.props.loading} handleShortMovie={this.handleShortMovie} handleMovieValue={this.handleMovieValue} />
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
