class Api {
  constructor({ url }) {
    this.url = url
  }
}

const moviesApi = new Api({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
})

export default moviesApi
