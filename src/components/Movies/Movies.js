import React from 'react'
import CurrentMoviesContext from '../../contexts/CurrentMoviesContext'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'

class Movies extends React.PureComponent {
  static contextType = CurrentMoviesContext

  render() {
    return (
      <div className="movies">
        <SearchForm
          clearError={this.props.clearError}
          loading={this.props.loading}
          getMovie={this.props.getMovie}
        />
        <MoviesCardList
          deleteMovie={this.props.deleteMovie}
          addMovie={this.props.addMovie}
          errorMessage={this.props.errorMessage}
          loopWithSlice={this.props.loopWithSlice}
          handleShowMoreMovies={this.props.handleShowMoreMovies}
          movies={this.context}
          path={this.props.path}
        />
      </div>
    )
  }
}

export default Movies
