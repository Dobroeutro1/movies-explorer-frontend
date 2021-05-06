import React from 'react'
import { Route, Switch } from 'react-router-dom'
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

import CurrentMoviesContext from '../../contexts/CurrentMoviesContext'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: true,
      movies: [],
    }
  }

  componentDidMount() {
    moviesApi.getMovies().then((res) => {
      this.setState({ movies: res })
    })
  }

  handleSubmitRegister() {}

  handleSubmitLogin() {}

  render() {
    console.log('App', this.state.movies)
    return (
      <div className='app'>
        <CurrentMoviesContext.Provider value={this.state.movies}>
          <Switch>
            <Route exact path='/'>
              <Header loggedIn={this.state.loggedIn} />
              <Main />
              <Footer />
            </Route>

            <ProtectedRoute path='/movies' header={true} footer={true} loggedIn={this.state.loggedIn} component={Movies}></ProtectedRoute>
            <ProtectedRoute path='/saved-movies' header={true} footer={true} loggedIn={this.state.loggedIn} component={SavedMovies}></ProtectedRoute>
            <ProtectedRoute path='/profile' header={true} footer={false} loggedIn={this.state.loggedIn} component={Profile}></ProtectedRoute>

            <Route path='/sign-up'>
              <Register handleSubmitRegister={this.handleSubmitRegister} />
            </Route>
            <Route path='/sign-in'>
              <Login handleSubmitLogin={this.handleSubmitLogin} />
            </Route>

            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </CurrentMoviesContext.Provider>
      </div>
    )
  }
}

export default App
