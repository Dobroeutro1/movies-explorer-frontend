import { checkResponse } from '../utils/utils'

class Api {
  constructor({ url }) {
    this.url = url
  }

  // Регистрация
  register = (email, password, name, next) => {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
      .then(checkResponse)
      .catch(next)
  }

  // Логин
  authorize = (email, password, next) => {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token)
          return res
        }
      })
      .catch(next)
  }

  // Проверка токена
  checkToken = (token, next) => {
    return fetch(`${this.url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(checkResponse)
      .catch(next)
  }

  // Данные пользователя
  getProfile = (next) => {
    return fetch(`${this.url}/users/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(checkResponse)
      .catch(next)
  }

  // Изменение данных пользователя
  editProfile = (email, name, next) => {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    })
      .then(checkResponse)
      .catch(next)
  }

  // Сохраненные фильмы
  getSavedMovies = (next) => {
    return fetch(`${this.url}/movies`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(checkResponse)
      .catch(next)
  }

  // Добавить фильм
  addMovie = (country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, next) => {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        nameRU,
        nameEN,
      }),
    })
      .then(checkResponse)
      .catch(next)
  }

  // Удалить фильм
  deleteMovie = (id, next) => {
    console.log('ID', id)
    return fetch(`${this.url}/movies/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(checkResponse)
      .catch(next)
  }
}

const mainApi = new Api({
  url: 'https://diplom.backend.nomoredomains.monster/api',
})

export default mainApi
