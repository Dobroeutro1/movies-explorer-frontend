import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'

class MoviesCardList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // static contextType = CurrentMoviesContext

  componentDidMount = () => {}

  render() {
    console.log('MOVIES CARD LIST PROPS', this.props.movies.savedMovies)
    return (
      <>
        <span className={`error ${this.props.errorMessage.type === 'getMovies' ? 'opened' : ''}`}>{this.props.errorMessage.value}</span>
        <div className='movies-grid'>
          {this.props.path === '/movies'
            ? this.props.movies.findedMovies.moviesToShow.map((movie) => {
                return <MoviesCard deleteMovie={this.props.deleteMovie} addMovie={this.props.addMovie} movie={movie} key={movie.id} path={this.props.path} />
              })
            : this.props.movies.savedMovies.map((movie) => {
                return <MoviesCard movie={movie} deleteMovie={this.props.deleteMovie} key={movie.id} path={this.props.path} />
              })}
        </div>
        {this.props.movies.findedMovies.next >= this.props.movies.findedMovies.defaultMovies.length || this.props.path === '/saved-movies' ? null : (
          <button onClick={this.props.handleShowMoreMovies} className='movies-grid__btn'>
            Ещё
          </button>
        )}
      </>
    )
  }
}

export default MoviesCardList
