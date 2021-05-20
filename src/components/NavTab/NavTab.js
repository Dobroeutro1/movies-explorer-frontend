import React from 'react'

class NavTab extends React.PureComponent {
  render() {
    return (
      <div className='navtab'>
        <button className='navtab__button'>О проекте</button>
        <button className='navtab__button'>Технологии</button>
        <button className='navtab__button'>Студент</button>
      </div>
    )
  }
}

export default NavTab
