import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'

class MoviesCardList extends React.PureComponent {
  render() {
    return (
      <>
        <div className='movies-grid'>
          {this.props.movies.map((movie) => {
            return <MoviesCard movie={movie} key={movie.id} path={this.props.path} />
          })}
        </div>
        <button className='movies-grid__btn'>Ещё</button>
      </>
    )
  }
}

export default MoviesCardList
