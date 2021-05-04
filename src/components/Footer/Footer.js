import React from 'react'

class Footer extends React.PureComponent {
  render() {
    return (
      <div className='footer'>
        <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__info'>
          <p className='footer__copy'>© 2020</p>
          <div className='footer__links'>
            <a href='yandex.ru' className='footer__link'>
              Яндекс.Практикум
            </a>
            <a href='yandex.ru' className='footer__link'>
              Github
            </a>
            <a href='yandex.ru' className='footer__link'>
              Facebook
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
