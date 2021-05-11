import { checkResponse } from '../utils/utils'

class Api {
  constructor({ url }) {
    this.url = url
  }

  getMovies() {
    return fetch(`${this.url}`, {
      headers: {},
    }).then(checkResponse)
  }
}

const moviesApi = new Api({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
})

export default moviesApi
