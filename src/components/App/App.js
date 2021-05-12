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
import { filterMovies } from '../../utils/utils'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        name: '',
      },
      loggedIn: false,
      loading: false,
      movies: {
        defaultMovies: [],
        moviesPerPage: 12,
        moviesPerAdding: 3,
        moviesToShow: [],
        next: 12,
      },
      SavedMovies: [],
      errorMessage: { value: '', type: '' },
    }
  }

  componentDidMount = () => {
    console.log('MOUNT!!!', window.screen)

    const token = localStorage.getItem('token')
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          console.log('CHECK TOKEN RES', res)
          if (res) {
            this.setState({ loggedIn: true, user: { email: res.email, name: res.name } })
            this.props.history.push('/movies')
          }
        })
        .catch((err) => this.setState({ errorMessage: { value: err, type: 'token' } }))

      this.getProfile()
      if (window.screen.width < 1279 && window.screen.width > 752) {
        this.setState((prev) => {
          return { movies: { ...prev.movies, moviesPerPage: 8, next: 8, moviesPerAdding: 2 } }
        })
      }

      if (window.screen.width < 752) {
        this.setState((prev) => {
          return { movies: { ...prev.movies, moviesPerPage: 5, next: 5, moviesPerAdding: 2 } }
        })
      }
    }
    this.setState({ errorMessage: { value: '', type: '' } })
  }

  // Регистрация
  onRegister = (email, password, name) => {
    mainApi
      .register(email, password, name)
      .then((res) => {
        console.log('REGISTER RES', res)
        this.setState({ user: { email: email, name: name } })
        this.props.history.push('/sign-in')
      })
      .catch((err) => this.setState({ errorMessage: { value: err, type: 'register' } }))
  }

  // Логин
  onLogin = (email, password) => {
    mainApi
      .authorize(email, password)
      .then((res) => {
        console.log('LOGIN RES', res)
        if (res) {
          localStorage.setItem('token', res.token)
          this.setState({ loggedIn: true })
          this.props.history.push('/movies')
          this.getProfile()
        }
      })
      .catch((err) => this.setState({ errorMessage: { value: err, type: 'login' } }))
  }

  // Логаут
  onSignOut = () => {
    localStorage.removeItem('token')
    this.setState({ loggedIn: false })
    this.props.history.push('/sign-in')
  }

  // Данные профиля
  getProfile = () => {
    mainApi
      .getProfile()
      .then((res) => {
        console.log('PROFILE RES', res)
        this.setState({ user: { email: res.email, name: res.name } })
      })
      .catch((err) => this.setState({ errorMessage: { value: err, type: 'getProfile' } }))
  }

  // Изменить данные профиля
  editProfile = (email, name) => {
    mainApi
      .editProfile(email, name)
      .then((res) => {
        console.log('EDIT PROFILE RES', res)
        this.setState({ user: { email: res.email, name: res.name } })
      })
      .catch((err) => this.setState({ errorMessage: { value: err, type: 'editProfile' } }))
  }

  getMovies = (value, short) => {
    console.log('value', value)
    console.log('short', short)
    this.setState({ loading: true })
    moviesApi
      .getMovies()
      .then((res) => {
        console.log('MOVIES RES', res)
        const movies = filterMovies(res, value, short)
        console.log('FILTER MOVIES', movies)
        if (filterMovies.length < 1) {
          this.setState({
            errorMessage: { value: 'Ничего не найдено :)', type: 'getMovies' },
          })
        }
        this.setState((prev) => {
          const slicedMovies = movies.slice(0, prev.movies.moviesPerPage)
          const arrayForHoldingMovies = [...prev.movies.moviesToShow, ...slicedMovies]
          return { movies: { ...prev.movies, defaultMovies: movies, moviesToShow: arrayForHoldingMovies }, loading: false }
        })
      })
      .catch((err) => this.setState({ errorMessage: { value: err, type: 'getMovies' } }))
  }

  loopWithSlice = (start, end) => {
    const slicedMovies = this.state.movies.defaultMovies.slice(start, end)
    const arrayForHoldingMovies = [...this.state.movies.moviesToShow, ...slicedMovies]
    console.log('slicedMovies', slicedMovies)
    console.log('arrayForHoldingMovies', arrayForHoldingMovies)
    this.setState((prev) => {
      return { movies: { ...prev.movies, moviesToShow: arrayForHoldingMovies } }
    })
  }

  handleShowMoreMovies = () => {
    this.loopWithSlice(this.state.movies.next, this.state.movies.next + this.state.movies.moviesPerAdding) // Готовим новый массив фильмов
    this.setState((prev) => {
      return { movies: { ...prev.movies, next: this.state.movies.next + this.state.movies.moviesPerAdding } }
    })
  }

  getSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        console.log('SAVED MOVIES', res)
      })
      .catch((err) => this.setState({ errorMessage: { value: err, type: 'getSavedMovies' } }))
  }

  addMovie = (movie) => {
    mainApi
      .addMovie(movie)
      .then((res) => {
        console.log('ADD MOVIE RES', res)
      })
      .catch((err) => this.setState({ errorMessage: { value: err, type: 'addMovie' } }))
  }

  deleteMovie = () => {}

  clearError = () => {
    this.setState({ errorMessage: { value: '', type: '' } })
  }

  render() {
    console.log('APP STATE', this.state)
    console.log('APP PROPS', this.props)
    // console.log('WINDOW', window.screen)
    return (
      <div className='app'>
        <CurrentUserContext.Provider value={this.state.user}>
          <CurrentMoviesContext.Provider value={this.state.movies}>
            <Switch>
              <Route exact path='/'>
                <Header loggedIn={this.state.loggedIn} />
                <Main />
                <Footer />
              </Route>

              <ProtectedRoute
                path='/movies'
                header={true}
                footer={true}
                getMovie={this.getMovies}
                deleteMovie={this.deleteMovie}
                addMovie={this.addMovie}
                loggedIn={this.state.loggedIn}
                loading={this.state.loading}
                errorMessage={this.state.errorMessage}
                clearError={this.clearError}
                loopWithSlice={this.loopWithSlice}
                handleShowMoreMovies={this.handleShowMoreMovies}
                component={Movies}></ProtectedRoute>
              <ProtectedRoute
                path='/saved-movies'
                header={true}
                footer={true}
                getMovie={this.getSavedMovies}
                deleteMovie={this.props.deleteMovie}
                addMovie={this.props.addMovie}
                loading={this.state.loading}
                errorMessage={this.state.errorMessage}
                clearError={this.clearError}
                loggedIn={this.state.loggedIn}
                component={SavedMovies}></ProtectedRoute>
              <ProtectedRoute
                path='/profile'
                header={true}
                footer={false}
                loggedIn={this.state.loggedIn}
                onSignOut={this.onSignOut}
                getProfile={this.getProfile}
                ready={this.state.readyEditProfile}
                editProfile={this.editProfile}
                component={Profile}></ProtectedRoute>

              <Route path='/sign-up'>
                <Register errorMessage={this.state.errorMessage} onRegister={this.onRegister} />
              </Route>
              <Route path='/sign-in'>
                <Login errorMessage={this.state.errorMessage} onLogin={this.onLogin} />
              </Route>

              <Route path='*'>
                <NotFound />
              </Route>
            </Switch>
          </CurrentMoviesContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    )
  }
}

export default withRouter(App)
