import React from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

class Profile extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        name: '',
      },
      ready: false,
    }
  }

  static contextType = CurrentUserContext

  componentDidMount = () => {
    this.setState({ user: this.context })
  }

  onChange = (e) => {
    const { id, value } = e.target

    this.setState((prev) => {
      if (value === this.context.email || value === this.context.name) {
        return {
          ...prev,
          user: { ...prev.user, [id]: value },
          ready: false,
        }
      }

      return { ...prev, user: { ...prev.user, [id]: value }, ready: true }
    })
  }

  editProfile = (e) => {
    e.preventDefault()
    this.props.editProfile(this.state.user.email, this.state.user.name)
    this.setState({ ready: false })
  }

  render() {
    return (
      <div className="profile">
        <h1 className="profile__title">Привет, {this.context.name}!</h1>
        <form className="profile__info">
          <div className="profile__info_element">
            <p className="profile__info_text">Имя</p>
            <input
              onChange={this.onChange}
              id="name"
              value={this.state.user.name}
              className="profile__info_text profile__info_input"
            />
          </div>
          <div className="profile__info_element">
            <p className="profile__info_text">E-mail</p>
            <input
              onChange={this.onChange}
              id="email"
              value={this.state.user.email}
              className="profile__info_text profile__info_input"
            />
          </div>
          <button
            disabled={!this.state.ready}
            type="submit"
            onClick={this.editProfile}
            className={`profile__btn ${this.state.ready ? '' : 'disabled'}`}
          >
            Редактировать
          </button>
        </form>

        <button onClick={this.props.onSignOut} className="profile__logout">
          Выйти из аккаунта
        </button>
      </div>
    )
  }
}

export default Profile
