import React from 'react'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { filterShortMovies } from '../../utils/utils'
import { filterMovies } from '../../utils/utils'

class SavedMovies extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      filteredMovies: [],
      value: '',
      short: '',
      errorMessage: { value: '', type: '' },
    }
  }

  componentDidMount = () => {
    localStorage.setItem('path', '/saved-movies')
  }

  handleShortMovie = () => {
    this.setState({ short: !this.state.short })
  }

  handleMovieValue = (value) => {
    this.setState({ value: value })
  }

  render() {
    console.group('SAVED MOVIES')
    console.log('PROPS', this.props)
    console.log('STATE', this.state)
    console.groupEnd()
    return (
      <div className="movies">
        <SearchForm
          loading={this.props.loading}
          handleShortMovie={this.handleShortMovie}
          handleMovieValue={this.handleMovieValue}
        />
        {/* <MoviesCardList
          deleteMovie={this.props.deleteMovie}
          errorMessage={this.props.errorMessage}
          movies={this.state.filteredMovies}
          path={this.props.path}
        /> */}
      </div>
    )
  }
}

export default SavedMovies
