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
        email: '',
        name: '',
      },
      loggedIn: false,
      loading: false,
      movies: [],
      errorMessage: '',
    }
  }

  componentDidMount = () => {
    console.log('MOUNT!!!')
    const token = localStorage.getItem('token')
    if (token) {
      mainApi.checkToken(token).then((res) => {
        console.log('CHECK TOKEN RES', res)
        if (res) {
          this.setState({ loggedIn: true, email: res.email, name: res.name })
          this.props.history.push('/movies')
        }
      })

      this.setState({ errorMessage: '' })
      this.getProfile()
    }
  }

  // Регистрация
  onRegister = (email, password, name) => {
    mainApi
      .register(email, password, name)
      .then((res) => {
        console.log('REGISTER RES', res)
        this.setState({ email: email, name: name })
        this.props.history.push('/sign-in')
      })
      .catch((err) => {
        this.setState({ errorMessage: err })
      })
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
      .catch((err) => {
        this.setState({ errorMessage: err })
      })
  }

  // Логаут
  onSignOut = () => {
    localStorage.removeItem('token')
    this.setState({ loggedIn: false })
    this.props.history.push('/sign-in')
  }

  // Данные профиля
  getProfile = () => {
    mainApi.getProfile().then((res) => {
      console.log('PROFILE RES', res)
      this.setState({ user: { email: res.email, name: res.name } })
    })
  }

  // Изменить данные профиля
  editProfile = (email, name) => {
    mainApi.editProfile(email, name).then((res) => {
      this.setState({ user: { email: res.email, name: res.name } })
    })
  }

  getMovies = (value, short) => {
    console.log('value', value)
    console.log('short', short)
    this.setState({ loading: true })
    moviesApi.getMovies().then((res) => {
      console.log('MOVIES RES', res)
      const filterMovies = res.filter((movie) => {
        return movie.nameRU.includes(value)
      })
      console.log(filterMovies)
      if (filterMovies.length < 1) {
        this.setState({ errorMessage: 'Ничего не найдено :)' })
      }
      this.setState({ movies: filterMovies, loading: false })
    })
  }

  getSavedMovies = () => {}

  addMovie = () => {}

  deleteMovie = () => {}

  render() {
    console.log('APP STATE', this.state)
    // console.log('APP PROPS', this.props)
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
                getMovie={this.getMovies}
                header={true}
                footer={true}
                loggedIn={this.state.loggedIn}
                loading={this.state.loading}
                component={Movies}></ProtectedRoute>
              <ProtectedRoute path='/saved-movies' header={true} footer={true} loggedIn={this.state.loggedIn} component={SavedMovies}></ProtectedRoute>
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
