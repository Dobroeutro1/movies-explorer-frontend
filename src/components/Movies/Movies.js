import React from 'react'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'

class Movies extends React.PureComponent {
  render() {
    return (
      <div className='movies'>
        <SearchForm />
        <MoviesCardList path={this.props.path} />
      </div>
    )
  }
}

export default Movies
