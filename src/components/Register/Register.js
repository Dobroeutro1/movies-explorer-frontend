import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import ValidationForm from '../../utils/ValidationForm'

class Register extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email: { value: '', valid: true },
      password: { value: '', valid: true },
      name: { value: '', valid: true },
      ready: false,
    }
  }

  handleReady = () => {
    return this.setState((prev) => {
      const ready =
        ValidationForm('email', this.state.email.value) &&
        ValidationForm('password', this.state.password.value) &&
        ValidationForm('name', this.state.name.value)
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

    this.props.onRegister(
      this.state.email.value,
      this.state.password.value,
      this.state.name.value
    )
  }

  render() {
    return (
      <div className="register">
        <div className="register__header">
          <Link to="/">
            <img className="register__logo" alt="logo" src={logo}></img>
          </Link>
          <h1 className="register__header_title">Добро пожаловать!</h1>
        </div>
        <form className="register__form">
          <div className="register__form_element">
            <label className="register__label" htmlFor="name">
              Имя
            </label>
            <input
              onChange={this.handleChange}
              required
              type="text"
              className="register__input"
              id="name"
            ></input>
            <span
              className={`register__span ${
                this.state.name.valid ? '' : 'opened'
              }`}
            >
              Что-то пошло не так...
            </span>
          </div>

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
              this.props.errorMessage.type === 'register' ? '' : 'opened'
            }`}
          >
            {this.props.errorMessage.value}
          </span>
          <button
            className={`register__btn ${this.state.ready ? '' : 'disabled'}`}
            type="submit"
            onClick={this.handleSubmit}
            disabled={!this.state.ready}
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="register__auth">
          <p className="register__auth_title">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="register__auth_link">
            Войти
          </Link>
        </div>
      </div>
    )
  }
}

export default Register
