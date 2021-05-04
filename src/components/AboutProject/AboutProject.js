import React from 'react'

class AboutProject extends React.PureComponent {
  render() {
    return (
      <div className='project'>
        <div className='project_header'>
          <h3 className='project_title'>О проекте</h3>
        </div>
        <div className='about__project_text_wrap'>
          <div className='about__project_text'>
            <h4 className='about__project_text_title'>Дипломный проект включал 5 этапов</h4>
            <p className='about__project_text_subtitle'>
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className='about__project_text'>
            <h4 className='about__project_text_title'>На выполнение диплома ушло 5 недель</h4>
            <p className='about__project_text_subtitle'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className='about__project_info'>
          <div className='about__project_info_backend'>
            <div className='about__project_info_week'>
              <p className='about__project_info_title'>1 неделя</p>
            </div>
            <p className='about__project_info_subtitle'>Back-end</p>
          </div>
          <div className='about__project_info_frontend'>
            <div className='about__project_info_week black'>
              <p className='about__project_info_title white_text'>4 недели</p>
            </div>
            <p className='about__project_info_subtitle'>Front-end</p>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutProject
