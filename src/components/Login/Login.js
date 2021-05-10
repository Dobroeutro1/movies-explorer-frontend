import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import ValidationForm from '../../utils/ValidationForm'

class Login extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email: { value: '', valid: true },
      password: { value: '', valid: true },
      ready: false,
    }
  }

  handleReady = () => {
    return this.setState((prev) => {
      const ready =
        ValidationForm('email', this.state.email.value) &&
        ValidationForm('password', this.state.password.value)
      return { ...prev, ready: ready }
    })
  }

  handleChange = (e) => {
    const { id, value } = e.target
    const valid = ValidationForm(id, value)

    this.setState((prev) => {
      return { ...prev, [id]: { value: value, valid: valid } }
    }, this.handleReady)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onLogin(this.state.email.value, this.state.password.value)
  }

  render() {
    return (
      <div className="register">
        <div className="register__header">
          <Link to="/">
            <img className="register__logo" alt="logo" src={logo}></img>
          </Link>
          <h1 className="register__header_title">Рады видеть!</h1>
        </div>
        <form className="register__form">
          <div className="register__form_element">
            <label className="register__label" htmlFor="email">
              E-mail
            </label>
            <input
              onChange={this.handleChange}
              required
              type="email"
              className="register__input"
              id="email"
            ></input>
            <span
              className={`register__span ${
                this.state.email.valid ? '' : 'opened'
              }`}
            >
              Что-то пошло не так...
            </span>
          </div>

          <div className="register__form_element">
            <label className="register__label" htmlFor="password">
              Пароль
            </label>
            <input
              onChange={this.handleChange}
              required
              type="password"
              className="register__input"
              id="password"
            ></input>
            <span
              className={`register__span ${
                this.state.password.valid ? '' : 'opened'
              }`}
            >
              Что-то пошло не так...
            </span>
          </div>

          <span
            className={`error ${
              this.props.errorMessage === '' ? '' : 'opened'
            }`}
          >
            {this.props.errorMessage}
          </span>
          <button
            onClick={this.handleSubmit}
            className={`register__btn ${this.state.ready ? '' : 'disabled'}`}
            type="submit"
            disabled={!this.state.ready}
          >
            Войти
          </button>
        </form>

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
