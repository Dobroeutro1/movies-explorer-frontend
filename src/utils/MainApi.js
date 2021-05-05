class Api {
  constructor({ url }) {
    this.url = url
  }
}

const mainApi = new Api({ url: 'https://diplom.backend.nomoredomains.monster' })

export default mainApi
