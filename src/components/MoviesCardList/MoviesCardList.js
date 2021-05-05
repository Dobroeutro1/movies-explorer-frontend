import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'

class MoviesCardList extends React.PureComponent {
  render() {
    return (
      <>
        <div className='movies-grid'>
          <MoviesCard path={this.props.path} added={true} del={false} />
          <MoviesCard path={this.props.path} added={false} del={true} />
          <MoviesCard path={this.props.path} />
          <MoviesCard path={this.props.path} />
          <MoviesCard path={this.props.path} />
          <MoviesCard path={this.props.path} />
          <MoviesCard path={this.props.path} />
          <MoviesCard path={this.props.path} />
          <MoviesCard path={this.props.path} />
          <MoviesCard path={this.props.path} />
        </div>
        <button className='movies-grid__btn'>Ещё</button>
      </>
    )
  }
}

export default MoviesCardList
