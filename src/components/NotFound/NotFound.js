import React from 'react'
import { Link } from 'react-router-dom'

class NotFound extends React.PureComponent {
  render() {
    return (
      <div className='not-found'>
        <h2 className='not-found__title'>404</h2>
        <p className='not-found__text'>Страница не найдена</p>
        <Link className='not-found__btn'>Назад</Link>
      </div>
    )
  }
}

export default NotFound
