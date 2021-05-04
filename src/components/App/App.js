import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import Login from '../Login/Login'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
// import NotFound from '../NotFound/NotFound'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
    }
  }

  handleSubmitRegister() {}

  handleSubmitLogin() {}

  render() {
    return (
      <div className='app'>
        {/* <NotFound /> */}
        <Header loggedIn={this.state.loggedIn} />
        <Switch>
          <ProtectedRoute exact path='/' loggedIn={this.state.loggedIn} component={Main}></ProtectedRoute>
          <Route path='/movies'>
            <Movies />
          </Route>
          <Route path='/saved-movies'>
            <SavedMovies />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/signup'>
            <Register handleSubmitRegister={this.handleSubmitRegister} />
          </Route>
          <Route path='/signin'>
            <Login handleSubmitLogin={this.handleSubmitLogin} />
          </Route>
          <Route>{this.state.loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}</Route>
        </Switch>
        {this.state.loggedIn ? <Footer /> : <Footer />}
      </div>
    )
  }
}

export default App
