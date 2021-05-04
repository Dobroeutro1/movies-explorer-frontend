import React from 'react'
import { Link } from 'react-router-dom'

class Login extends React.PureComponent {
  render() {
    console.log('fsdfsdf')
    return (
      <div className="register">
        <div className="register__header">
          <div className="logo register__logo"></div>
          <h1 className="register__header_title">Рады видеть!</h1>
        </div>
        <form className="register__form">
          <div className="register__form_element">
            <label className="register__label" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              value="Виталий"
              className="register__input"
              id="email"
            ></input>
            <span className="register__span">Что-то пошло не так...</span>
          </div>

          <div className="register__form_element">
            <label className="register__label" htmlFor="password">
              Пароль
            </label>
            <input
              type="password"
              value="Виталий"
              className="register__input"
              id="password"
            ></input>
            <span className="register__span">Что-то пошло не так...</span>
          </div>
        </form>
        <button className="register__btn" type="submit">
          Войти
        </button>
        <div className="register__auth">
          <p className="register__auth_title">Еще не зарегистрированы?</p>
          <Link to="/sign-up" className="register__auth_link">
            Регистрация
          </Link>
        </div>
      </div>
    )
  }
}

export default Login
