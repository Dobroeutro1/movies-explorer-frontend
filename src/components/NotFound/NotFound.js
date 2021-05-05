import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class NotFound extends React.PureComponent {
  render() {
    return (
      <div className='not-found'>
        <h2 className='not-found__title'>404</h2>
        <p className='not-found__text'>Страница не найдена</p>
        <Link onClick={this.props.history.goBack} className='not-found__btn'>
          Назад
        </Link>
      </div>
    )
  }
}

export default withRouter(NotFound)
