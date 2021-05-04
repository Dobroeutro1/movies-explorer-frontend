import React from 'react'

class Profile extends React.PureComponent {
  render() {
    return (
      <div className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <div className="profile__info">
          <div className="profile__info_element">
            <p className="profile__info_text">Имя</p>
            <p className="profile__info_text">Виталий</p>
          </div>
          <div className="profile__info_element">
            <p className="profile__info_text">E-mail</p>
            <p className="profile__info_text">Виталий</p>
          </div>
        </div>
        <button className="profile__btn">Редактировать</button>
        <button className="profile__logout">Выйти из аккаунта</button>
      </div>
    )
  }
}

export default Profile
