import React from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import ValidationForm from '../../utils/ValidationForm'

class Profile extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email: { value: '', valid: true },
      name: { value: '', valid: true },
      ready: false,
      message: false,
    }
  }

  static contextType = CurrentUserContext

  componentDidMount = () => {
    localStorage.setItem('path', this.props.path)
    this.setState((prev) => {
      return {
        ...prev,
        email: { ...prev.email, value: this.context.email.value },
        name: { ...prev.name, value: this.context.name.value },
        message: false,
      }
    })
  }

  handleReady = () => {
    return this.setState((prev) => {
      const ready = ValidationForm('email', this.state.email.value) && ValidationForm('name', this.state.name.value)
      return { ...prev, ready: ready }
    })
  }

  onChange = (e) => {
    const { id, value } = e.target
    const valid = ValidationForm(id, value)

    this.setState((prev) => {
      if (value === this.context.email.value || value === this.context.name.value) {
        return {
          ...prev,
          [id]: { ...prev[id], value: value, valid: valid },
          message: false,
        }
      }

      return {
        ...prev,
        [id]: { ...prev[id], value: value, valid: valid },
        message: false,
      }
    }, this.handleReady)
  }

  editProfile = (e) => {
    e.preventDefault()
    this.props.editProfile(this.state.email.value, this.state.name.value)
    this.setState((prev) => {
      return { ...prev, ready: false, message: true }
    })
  }

  render() {
    return (
      <div className='profile'>
        <span className={`profile__span_edit ${!this.state.message ? '' : 'opened'}`}>Изменения успешно применены!</span>
        <h1 className='profile__title'>Привет, {this.context.name.value}!</h1>

        <form className='profile__info'>
          <div className='profile__info_element'>
            <div className='profile__info_group'>
              <p className='profile__info_text'>Имя</p>
              <input onChange={this.onChange} id='name' value={this.state.name.value} className='profile__info_text profile__info_input' />
            </div>
            <span className={`profile__span ${this.state.name.valid ? '' : 'opened'}`}>Что-то пошло не так...</span>
          </div>
          <div className='profile__info_element'>
            <div className='profile__info_group'>
              <p className='profile__info_text'>E-mail</p>
              <input onChange={this.onChange} id='email' value={this.state.email.value} className='profile__info_text profile__info_input' />
            </div>
            <span className={`profile__span ${this.state.email.valid ? '' : 'opened'}`}>Что-то пошло не так...</span>
          </div>
          <button disabled={!this.state.ready} type='submit' onClick={this.editProfile} className={`profile__btn ${this.state.ready ? '' : 'disabled'}`}>
            Редактировать
          </button>
        </form>

        <button onClick={this.props.onSignOut} className='profile__logout'>
          Выйти из аккаунта
        </button>
      </div>
    )
  }
}

export default Profile
