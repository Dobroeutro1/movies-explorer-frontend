import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? (
          <>
            {props.header ? <Header loggedIn={props.loggedIn} /> : null}
            <Component {...props} />
            {props.footer ? <Footer /> : null}
          </>
        ) : (
          <Redirect to='/' />
        )
      }
    </Route>
  )
}

export default withRouter(ProtectedRoute)
