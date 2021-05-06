class Api {
  constructor({ url }) {
    this.url = url
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  register = (name, email, password) => {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkResponse)
  }

  authorize = (email, password) => {
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
  }

  checkToken = (token) => {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse)
  }

  getProfile = () => {}

  editProfile = () => {}

  getSavedMovies = () => {}

  addMovie = () => {}

  deleteMovie = () => {}
}

const mainApi = new Api({ url: 'https://diplom.backend.nomoredomains.monster/api' })

export default mainApi
