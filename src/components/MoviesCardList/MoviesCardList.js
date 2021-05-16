import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'

class MoviesCardList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // console.group('MOVIES CARD LIST')
    // console.log('PROPS', this.props)
    // console.log('STATE', this.state)
    // console.groupEnd()

    return (
      <>
        <span
          className={`error ${
            this.props.errorMessage.type === 'filter' ? 'opened' : ''
          }`}
        >
          {this.props.errorMessage.value}
        </span>
        <div className="movies-grid">
          {this.props.movies.map((movie) => {
            return (
              <MoviesCard
                deleteMovie={this.props.deleteMovie}
                addMovie={this.props.addMovie}
                movie={movie}
                key={movie.id}
                path={this.props.path}
              />
            )
          })}
        </div>
        <button
          onClick={this.props.handleShowMoreMovies}
          className={`movies-grid__btn ${
            this.props.path === '/saved-movies' ? 'closed' : ''
          }`}
        >
          Ещё
        </button>
      </>
    )
  }
}

export default MoviesCardList
