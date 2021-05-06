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

  getMovies() {
    return fetch(`${this.url}`, {
      headers: {},
    }).then(this._checkResponse)
  }
}

const moviesApi = new Api({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
})

export default moviesApi
