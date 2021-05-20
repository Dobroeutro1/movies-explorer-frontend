import React from 'react'

class AboutMe extends React.PureComponent {
  render() {
    return (
      <div className='project'>
        <div className='project_header'>
          <h2 className='project_title'>Студент</h2>
        </div>
        <div className='aboutme__student'>
          <div className='aboutme__student_info'>
            <h3 className='aboutme__student_title'>Виталий</h3>
            <h4 className='aboutme__student_subtitle'>Фронтенд-разработчик, 30 лет</h4>
            <p className='aboutme__student_text'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С
              2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <div className='aboutme__student_links'>
              <a className='aboutme__student_link' href='facebook.com'>
                Facebook
              </a>
              <a className='aboutme__student_link' href='github.com'>
                Github
              </a>
            </div>
          </div>
          <div className='aboutme__student_img' alt='avatar'></div>
        </div>
        <div className='aboutme__portfolio'>
          <h3 className='aboutme__portfolio_title'>Портфолио</h3>
          <div className='aboutme__portfolio_link'>
            <a href='github.com' className='aboutme__link'>
              Статичный сайт
            </a>
            <p className='aboutme__arrow'>↗</p>
          </div>
          <div className='aboutme__portfolio_link'>
            <a href='github.com' className='aboutme__link'>
              Адаптивный сайт
            </a>
            <p className='aboutme__arrow'>↗</p>
          </div>
          <div className='aboutme__portfolio_link'>
            <a href='github.com' className='aboutme__link'>
              Одностраничное приложение
            </a>
            <p className='aboutme__arrow'>↗</p>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutMe
