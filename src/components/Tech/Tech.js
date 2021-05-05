import React from 'react'

class Tech extends React.PureComponent {
  render() {
    return (
      <div className='project tech'>
        <div className='project_header'>
          <h2 className='project_title'>Технологии</h2>
        </div>
        <div className='tech__content'>
          <h2 className='tech__content_title'>7 технологий</h2>
          <p className='tech__content_text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <div className='tech__technology_wrap'>
            <div className='tech__technology'>
              <p className='tech__technology_title'>HTML</p>
            </div>
            <div className='tech__technology'>
              <p className='tech__technology_title'>CSS</p>
            </div>
            <div className='tech__technology'>
              <p className='tech__technology_title'>JS</p>
            </div>
            <div className='tech__technology'>
              <p className='tech__technology_title'>React</p>
            </div>
            <div className='tech__technology'>
              <p className='tech__technology_title'>Git</p>
            </div>
            <div className='tech__technology'>
              <p className='tech__technology_title'>Express.js</p>
            </div>
            <div className='tech__technology'>
              <p className='tech__technology_title'>mongoDB</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Tech
