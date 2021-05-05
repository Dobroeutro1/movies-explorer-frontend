import React from 'react'
import { Link } from 'react-router-dom'

class BurgerPopup extends React.PureComponent {
  render() {
    return (
      <div className={`burger-popup ${this.props.open ? '' : 'burger-popup__closed'}`}>
        <button className={`burger-popup__close ${this.props.open ? '' : 'closed'}`} onClick={this.props.onClick}></button>
        <div className={`burger-popup__links ${this.props.open ? '' : 'closed'}`}>
          <Link to='/' className='burger-popup__link' onClick={this.props.onClick}>
            Главная
          </Link>
          <Link to='/movies' className='burger-popup__link' onClick={this.props.onClick}>
            Фильмы
          </Link>
          <Link to='/saved-movies' className='burger-popup__link' onClick={this.props.onClick}>
            Сохранённые фильмы
          </Link>
        </div>
        <div className={`burger-popup__account ${this.props.open ? '' : 'closed'}`}>
          <p className='burger-popup__text'>Аккаунт</p>
          <Link to='/profile' className='burger-popup__button_account' onClick={this.props.onClick}></Link>
        </div>
      </div>
    )
  }
}

export default BurgerPopup
