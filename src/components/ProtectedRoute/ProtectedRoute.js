import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? (
          <>
            <Header loggedIn={props.loggedIn} />
            <Component {...props} />
            {props.footer ? null : <Footer />}
          </>
        ) : (
          <Redirect to='/' />
        )
      }
    </Route>
  )
}

export default ProtectedRoute
