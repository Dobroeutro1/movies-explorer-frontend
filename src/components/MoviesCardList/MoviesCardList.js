import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'

class MoviesCardList extends React.PureComponent {
  render() {
    console.log('MOVIES CARD LIST', this.props)
    return (
      <>
        <div className='movies-grid'>
          {this.props.movies.map((movie) => {
            return <MoviesCard movie={movie} key={movie.id} path={this.props.path} />
          })}
        </div>
        {this.props.movies.length < 1 ? null : <button className='movies-grid__btn'>Ещё</button>}
      </>
    )
  }
}

export default MoviesCardList
