import React from 'react'
import CurrentMoviesContext from '../../contexts/CurrentMoviesContext'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'

class Movies extends React.PureComponent {
  static contextType = CurrentMoviesContext

  render() {
    console.log('MOVIES PROPS', this.props)
    return (
      <div className='movies'>
        <SearchForm loading={this.props.loading} getMovie={this.props.getMovie} />
        <MoviesCardList movies={this.context} path={this.props.path} />
      </div>
    )
  }
}

export default Movies
