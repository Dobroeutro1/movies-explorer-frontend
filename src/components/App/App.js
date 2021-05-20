import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import Login from '../Login/Login'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import NotFound from '../NotFound/NotFound'
import moviesApi from '../../utils/MoviesApi'
import mainApi from '../../utils/MainApi'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import CurrentMoviesContext from '../../contexts/CurrentMoviesContext'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: { value: '', valid: true },
        name: { value: '', valid: true },
      },
      movies: {
        loadingMovies: [],
        savedMovies: [],
        shortMovie: false,
        movieValue: '',
      },
      loggedIn: false,
      loading: false,
      errorMessage: { value: '', type: '' },
    }
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token')
    localStorage.setItem('path', this.props.location.pathname)

    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            this.setState({
              loggedIn: true,
              user: {
                email: { value: res.email, valid: true },
                name: { value: res.name, valid: true },
              },
            })
            this.props.history.push(localStorage.path)
          }
        })
        .catch((err) =>
          this.setState({ errorMessage: { value: err, type: 'token' } })
        )

      this.getMovies()
      this.getSavedMovies()
    }
    this.setState({ errorMessage: { value: '', type: '' } })
  }

  // Регистрация
  onRegister = (email, password, name) => {
    mainApi
      .register(email, password, name)
      .then((res) => {
        this.setState((prev) => {
          return { ...prev, user: { email: email, name: name } }
        })
        this.props.history.push('/sign-in')
      })
      .catch((err) =>
        this.setState((prev) => {
          return { ...prev, errorMessage: { value: err, type: 'register' } }
        })
      )
  }

  // Логин
  onLogin = (email, password) => {
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token)
          this.setState({ loggedIn: true })
          this.props.history.push('/movies')
          this.getProfile()
          this.getMovies()
        }
      })
      .catch((err) =>
        this.setState((prev) => {
          return { ...prev, errorMessage: { value: err, type: 'login' } }
        })
      )
  }

  // Логаут
  onSignOut = () => {
    localStorage.removeItem('token')
    this.setState((prev) => {
      return { ...prev, loggedIn: false }
    })
    this.props.history.push('/sign-in')
  }

  // Данные профиля
  getProfile = () => {
    mainApi
      .getProfile()
      .then((res) => {
        console.log('RES', res)
        console.log('RES STATE', this.state.user)
        this.setState((prev) => {
          return {
            ...prev,
            user: {
              email: { value: res.email, valid: true },
              name: { value: res.name, valid: true },
            },
          }
        })
      })
      .catch((err) =>
        this.setState((prev) => {
          return { ...prev, errorMessage: { value: err, type: 'getProfile' } }
        })
      )
  }

  // Изменить данные профиля
  editProfile = (email, name) => {
    mainApi
      .editProfile(email, name)
      .then((res) => {
        this.setState((prev) => {
          return {
            ...prev,
            user: {
              email: { value: res.email, valid: true },
              name: { value: res.name, valid: true },
            },
          }
        })
      })
      .catch((err) =>
        this.setState((prev) => {
          return { ...prev, errorMessage: { value: err, type: 'editProfile' } }
        })
      )
  }

  // Получить все фильмы
  getMovies = () => {
    this.setState((prev) => {
      return {
        ...prev,
        loading: true,
      }
    })

    moviesApi
      .getMovies()
      .then((res) => {
        if (res.length < 1) {
          this.setState((prev) => {
            return {
              ...prev,
              errorMessage: {
                value: 'Ничего не найдено :)',
                type: 'getMovies',
              },
            }
          })
        }

        this.setState((prev) => {
          return {
            ...prev,
            loading: false,
            movies: { ...prev.movies, loadingMovies: res },
          }
        })
      })
      .catch((err) =>
        this.setState((prev) => {
          return { ...prev, errorMessage: { value: err, type: 'getMovies' } }
        })
      )
  }

  // Получить сохраненные фильмы
  getSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        this.setState((prev) => {
          return {
            ...prev,
            movies: { ...prev.movies, savedMovies: res },
          }
        })
      })
      .catch((err) =>
        this.setState((prev) => {
          return {
            ...prev,
            errorMessage: { value: err, type: 'getSavedMovies' },
          }
        })
      )
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
    thumbnail,
    nameRU,
    nameEN,
    id
  ) => {
    mainApi
      .addMovie(
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
        id
      )
      .then((res) => {
        this.setState((prev) => {
          return {
            ...prev,
            movies: {
              ...prev.movies,
              savedMovies: [...prev.movies.savedMovies, res],
            },
          }
        })
        console.log('ADDMOVIE', res)
      })
      .catch((err) =>
        this.setState((prev) => {
          return { ...prev, errorMessage: { value: err, type: 'addMovie' } }
        })
      )
  }

  // Удалить фильм
  deleteMovie = (id) => {
    mainApi
      .deleteMovie(id)
      .then((res) => {
        if (res) {
          const filteredMovies = this.state.movies.savedMovies.filter(
            (el) => el.id !== id
          )

          this.setState((prev) => {
            return {
              ...prev,
              movies: {
                loadingMovies: prev.movies.loadingMovies,
                shortMovie: prev.movies.shortMovie,
                movieValue: prev.movies.movieValue,
                savedMovies: filteredMovies,
              },
            }
          })
        }
      })
      .catch((err) =>
        this.setState((prev) => {
          return { ...prev, errorMessage: { value: err, type: 'deleteMovie' } }
        })
      )
  }

  clearError = () => {
    this.setState((prev) => {
      return { ...prev, errorMessage: { value: '', type: '' } }
    })
  }

  render() {
    // console.group('APP')
    // console.log('STATE', this.state.movies)
    // console.log('PROPS', this.props)
    // console.groupEnd()
    // console.log('APP STATE', this.state)
    return (
      <div className="app">
        <CurrentUserContext.Provider value={this.state.user}>
          <Switch>
            <Route exact path="/">
              <Header loggedIn={this.state.loggedIn} />
              <Main />
              <Footer />
            </Route>

            <ProtectedRoute
              path="/movies"
              deleteMovie={this.deleteMovie}
              addMovie={this.addMovie}
              loggedIn={this.state.loggedIn}
              loading={this.state.loading}
              errorMessage={this.state.errorMessage}
              loadingMovies={this.state.movies.loadingMovies}
              savedMovies={this.state.movies.savedMovies}
              component={Movies}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/saved-movies"
              deleteMovie={this.deleteMovie}
              loggedIn={this.state.loggedIn}
              loading={this.state.loading}
              errorMessage={this.state.errorMessage}
              savedMovies={this.state.savedMovies}
              component={SavedMovies}
            ></ProtectedRoute>

            <ProtectedRoute
              path="/profile"
              footer={true}
              loggedIn={this.state.loggedIn}
              onSignOut={this.onSignOut}
              getProfile={this.getProfile}
              ready={this.state.readyEditProfile}
              editProfile={this.editProfile}
              component={Profile}
            ></ProtectedRoute>

            <Route path="/sign-up">
              <Register
                errorMessage={this.state.errorMessage}
                onRegister={this.onRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                errorMessage={this.state.errorMessage}
                onLogin={this.onLogin}
              />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </CurrentUserContext.Provider>
      </div>
    )
  }
}

export default withRouter(App)
