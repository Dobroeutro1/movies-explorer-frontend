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
    console.log('MOVIES CARD LIST PROPS', this.props)
    console.log('MOVIES CARD LIST STATE', this.state)
    return (
      <>
        <span className={`error ${this.props.errorMessage.type === 'getMovie' ? '' : 'opened'}`}>{this.props.errorMessage.value}</span>
        <div className='movies-grid'>
          {this.props.movies.moviesToShow.map((movie) => {
            // console.log('movie', movie)
            return <MoviesCard deleteMovie={this.props.deleteMovie} addMovie={this.props.addMovie} movie={movie} key={movie.id} path={this.props.path} />
          })}
        </div>
        {this.props.movies.next >= this.props.movies.defaultMovies.length ? null : (
          <button onClick={this.props.handleShowMoreMovies} className='movies-grid__btn'>
            Ещё
          </button>
        )}
      </>
    )
  }
}

export default MoviesCardList
