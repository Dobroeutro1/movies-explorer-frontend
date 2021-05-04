import React from 'react'
import Promo from '../Promo/Promo'
import NavTab from '../NavTab/NavTab'
import AboutProject from '../AboutProject/AboutProject'
import Tech from '../Tech/Tech'
import AboutMe from '../AboutMe/AboutMe'

class Main extends React.PureComponent {
  render() {
    return (
      <>
        <Promo />
        <NavTab />
        <AboutProject />
        <Tech />
        <AboutMe />
      </>
    )
  }
}

export default Main
