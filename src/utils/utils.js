export function checkResponse(res) {
  // console.log('CHECK RESPONSE', res)

  if (res.ok) {
    return res.json()
  }

  if (res.status === 409) {
    return Promise.reject('Такой email уже зарегистрирован')
  }

  if (res.status === 401) {
    return Promise.reject('Проверьте правильность введенных данных')
  }

  if (res.status === 400) {
    return Promise.reject('Проверьте правильность введенных данных')
  }

  if (res.status === 404) {
    return Promise.reject('Страница не найдена')
  }

  return Promise.reject('Ошибка сервера')
}

export function filterMovies(data, value, short) {
  let filterMovies = data.filter((movie) => {
    return movie.nameRU.includes(value)
  })

  if (short) {
    filterMovies = filterMovies.filter((movie) => movie.duration < 41)
  }

  return filterMovies
}
