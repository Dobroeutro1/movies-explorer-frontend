class Api {
  constructor({ url }) {
    this.url = url
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    console.log('CHECK RESPONSE', res)
    if (res.status === 409) {
      return Promise.reject('Такой email уже зарегистрирован')
    }

    if (res.status === 401) {
      return Promise.reject('Проверьте правильность введенных данных')
    }

    if (res.status === 400) {
      return Promise.reject('ХуйПиздаДжигурда')
    }

    return Promise.reject('Ошибка сервера')
  }

  // Регистрация
  register = (email, password, name, next) => {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
      .then(this._checkResponse)
      .catch(next)
  }

  // Логин
  authorize = (email, password, next) => {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(this._checkResponse)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token)
          return res
        }
      })
      .catch(next)
  }

  // Проверка токена
  checkToken = (token) => {
    return fetch(`${this.url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse)
  }

  // Данные пользователя
  getProfile = () => {
    return fetch(`${this.url}/users/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(this._checkResponse)
  }

  // Изменение данных пользователя
  editProfile = (email, name) => {
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
    }).then(this._checkResponse)
  }

  // Сохраненные фильмы
  getSavedMovies = () => {
    return fetch(`${this.url}/movies`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(this._checkResponse)
  }

  // Добавить фильм
  addMovie = (
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner
  ) => {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      country,
      body: JSON.stringify({
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        owner,
        thumbnail,
      }),
    }).then(this._checkResponse)
  }

  // Удалить фильм
  deleteMovie = (id) => {
    return fetch(`${this.url}/movies`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({
        _id: id,
      }),
    }).then(this._checkResponse)
  }
}

const mainApi = new Api({
  url: 'https://diplom.backend.nomoredomains.monster/api',
})

export default mainApi
