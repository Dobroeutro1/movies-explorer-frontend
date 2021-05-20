export function checkResponse(res) {
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

export function filterMovies(data, savedMovies, value, short) {
  let filterMovies = data.filter((movie) => {
    return movie.nameRU.includes(value)
  })

  let savedMoviesId = savedMovies.map((movie) => {
    return movie.id
  })

  if (short) {
    filterMovies = filterMovies.filter((movie) => movie.duration < 41)
  }

  let filterWithSavedMovies = filterMovies.map((movie) => {
    if (savedMoviesId.includes(movie.id)) {
      movie.added = true
    } else {
      movie.added = false
    }

    return movie
  })

  return filterWithSavedMovies
}

export function checkWindowWidth() {
  if (window.screen.width < 1279 && window.screen.width > 752) {
    this.setState((prev) => {
      return {
        ...prev,
        moviesPerPage: 8,
        next: 8,
        moviesPerAdding: 2,
      }
    })
  }

  if (window.screen.width < 752) {
    this.setState((prev) => {
      return {
        ...prev,
        moviesPerPage: 5,
        next: 5,
        moviesPerAdding: 2,
      }
    })
  }
}
