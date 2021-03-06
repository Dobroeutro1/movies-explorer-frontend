import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import BurgerPopup from '../BurgerPopup/BurgerPopup'

class Header extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  onClick = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    return this.props.loggedIn ? (
      <div className={`header ${this.props.path ? 'header_black' : null}`}>
        <Link to='/' className='logo'></Link>
        <div className='header__buttons'>
          <Link to='/movies' className='header_button header_button_film'>
            Фильмы
          </Link>
          <Link to='/saved-movies' className='header_button header_button_film'>
            Сохранённые фильмы
          </Link>
        </div>
        <div className='header__account'>
          <p className='header__text'>Аккаунт</p>
          <Link to='/profile' className='header__button_account'></Link>
        </div>
        <button className='header__burger' onClick={this.onClick}></button>
        <BurgerPopup open={this.state.open} onClick={() => this.onClick()} />
      </div>
    ) : (
      <div className='header'>
        <Link to='/' className='logo'></Link>
        <div className='header__buttons'>
          <Link to='/sign-up' className='header_button header_button_reg'>
            Регистрация
          </Link>
          <Link to='/sign-in' className='header_button header_button_log'>
            Войти
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
