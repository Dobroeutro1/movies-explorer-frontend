import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import { checkWindowWidth } from '../../utils/utils'

class MoviesCardList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      moviesPerPage: 12,
      moviesPerAdding: 3,
      next: 12,
      moviesToShow: [],
    }
  }

  componentDidMount = () => {
    checkWindowWidth()
    this.loopWithSlice(0, this.state.moviesPerPage)
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.movies !== this.props.movies) {
      this.loopWithSlice(0, this.state.moviesPerPage)
    }
  }

  // Обрезает массив фильмов и передаёт новый массив
  loopWithSlice = (start, end) => {
    const slicedMovies = this.props.movies.slice(start, end)
    let arrayForHoldingMovies = [...this.state.moviesToShow, ...slicedMovies]
    console.log('arrayForHoldingMovies', arrayForHoldingMovies)
    this.setState((prev) => {
      return { ...prev, moviesToShow: arrayForHoldingMovies }
    })
  }

  // Обработчик нажатия кнопки добавления фильмов «Ещё»
  handleShowMoreMovies = () => {
    this.loopWithSlice(this.state.next, this.state.next + this.state.moviesPerAdding) // Готовим новый массив фильмов
    this.setState((prev) => {
      return { ...prev, next: prev.next + this.state.moviesPerAdding }
    })
  }

  render() {
    console.group('MOVIES CARD LIST')
    console.log('PROPS', this.props.movies)
    console.log('STATE', this.state)
    console.groupEnd()

    return (
      <>
        <span className={`error ${this.props.errorMessage.type === 'filter' ? 'opened' : ''}`}>{this.props.errorMessage.value}</span>
        <div className='movies-grid'>
          {this.props.path === '/saved-movies'
            ? this.props.movies.map((movie) => {
                return <MoviesCard deleteMovie={this.props.deleteMovie} addMovie={this.props.addMovie} movie={movie} key={movie.id} path={this.props.path} />
              })
            : this.state.moviesToShow.map((movie) => {
                return <MoviesCard deleteMovie={this.props.deleteMovie} addMovie={this.props.addMovie} movie={movie} key={movie.id} path={this.props.path} />
              })}
        </div>
        <button
          onClick={this.handleShowMoreMovies}
          className={`movies-grid__btn ${this.props.path === '/saved-movies' || this.state.moviesToShow.length < this.state.next ? 'closed' : ''}`}>
          Ещё
        </button>
      </>
    )
  }
}

export default MoviesCardList
