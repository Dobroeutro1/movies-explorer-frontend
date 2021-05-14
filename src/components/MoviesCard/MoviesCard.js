import React from 'react'

class MoviesCard extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      added: this.props.added,
    }
  }

  addMovie = () => {
    const country = this.props.movie.country
      ? this.props.movie.country
      : 'no data'
    const director = this.props.movie.director
      ? this.props.movie.director
      : 'no data'
    const duration = this.props.movie.duration
      ? this.props.movie.duration
      : 'no data'
    const year = this.props.movie.year ? this.props.movie.year : 'no data'
    const description = this.props.movie.description
      ? this.props.movie.description
      : 'no data'
    const image = this.props.movie.image.url
      ? `https://api.nomoreparties.co${this.props.movie.image.url}`
      : 'no data'
    const trailer = this.props.movie.trailer
      ? this.props.movie.trailer
      : 'https://api.nomoreparties.co'
    const nameRU = this.props.movie.nameRU ? this.props.movie.nameRU : 'no data'
    const nameEN = this.props.movie.nameEN ? this.props.movie.nameEN : 'no data'
    const thumbnail = this.props.movie.thumbnail
      ? this.props.movie.thumbnail
      : 'https://api.nomoreparties.co'
    const id = this.props.movie.id

    this.props.addMovie(
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      nameRU,
      nameEN,
      id
    )
    this.setState({ added: true })
  }

  deleteMovie = () => {
    this.props.deleteMovie(this.props.movie._id)
  }

  render() {
    return (
      <div className="card">
        <div className="card__header">
          <a
            target="_blank"
            href={
              this.props.movie.trailerLink
                ? this.props.movie.trailerLink
                : 'youtube.com'
            }
            className="card__title"
            rel="noreferrer"
          >
            {this.props.movie.nameRU}
          </a>
          <p className="card__duration">{this.props.movie.duration} минут</p>
        </div>
        <img
          src={`${
            this.props.movie.image
              ? this.props.movie.image.url
                ? `https://api.nomoreparties.co${this.props.movie.image?.url}`
                : this.props.movie.image
              : ''
          }`}
          alt={this.props.movie.nameRU}
          className="card__img"
        ></img>
        {this.props.path === '/saved-movies' ? (
          <button
            onClick={this.deleteMovie}
            className="card__btn card__btn_deleted"
          ></button>
        ) : null}
        {this.state.added && this.props.path === '/movies' ? (
          <button className="card__btn card__btn_checked"></button>
        ) : null}
        {!this.state.added && this.props.path === '/movies' ? (
          <button onClick={this.addMovie} className="card__btn">
            Сохранить
          </button>
        ) : null}
      </div>
    )
  }
}

export default MoviesCard
