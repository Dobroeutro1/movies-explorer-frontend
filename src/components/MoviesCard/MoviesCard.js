import React from 'react'

class MoviesCard extends React.PureComponent {
  render() {
    // console.log('PROPS MOVIE', this.props.movie)
    return (
      <div className="card">
        <div className="card__header">
          <a
            target="_blank"
            href={this.props.movie.trailerLink}
            className="card__title"
            rel="noreferrer"
          >
            {this.props.movie.nameRU}
          </a>
          <p className="card__duration">{this.props.movie.duration} минут</p>
        </div>
        <img
          src={` https://api.nomoreparties.co${this.props.movie.image?.url}`}
          alt={this.props.movie.nameRU}
          className="card__img"
        ></img>
        {this.props.path === '/saved-movies' ? (
          <button className="card__btn card__btn_deleted"></button>
        ) : null}
        {this.props.added && this.props.path === '/movies' ? (
          <button className="card__btn card__btn_checked"></button>
        ) : null}
        {!this.props.added && this.props.path === '/movies' ? (
          <button className="card__btn">Сохранить</button>
        ) : null}
      </div>
    )
  }
}

export default MoviesCard
