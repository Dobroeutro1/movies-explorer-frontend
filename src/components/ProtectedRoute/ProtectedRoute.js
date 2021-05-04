import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...props }) => {
  console.log(props.loggedIn)
  return <Route>{() => (props.loggedIn ? <Redirect to='/movies' /> : <Component {...props} />)}</Route>
}

export default ProtectedRoute