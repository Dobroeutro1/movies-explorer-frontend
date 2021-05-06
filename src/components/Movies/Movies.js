import React from 'react'
import CurrentMoviesContext from '../../contexts/CurrentMoviesContext'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'

class Movies extends React.PureComponent {
  static contextType = CurrentMoviesContext

  render() {
    console.log('MOVIES', this.props)
    console.log('MOVIES context', this.context)
    return (
      <div className='movies'>
        <SearchForm />
        <MoviesCardList movies={this.context} path={this.props.path} />
      </div>
    )
  }
}

export default Movies
