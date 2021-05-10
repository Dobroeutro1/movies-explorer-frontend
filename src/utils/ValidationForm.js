import { regEmail } from '../constants/constants'

const ValidationForm = (id, value) => {
  if (id === 'name') {
    return value.length < 1 ? false : true
  }

  if (id === 'email') {
    return regEmail.test(value)
  }

  if (id === 'password') {
    return value.length < 8 ? false : true
  }

  return null
}

export default ValidationForm
