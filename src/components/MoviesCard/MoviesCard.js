import React from 'react'
import testImg from '../../images/test_card_img.svg'

class MoviesCard extends React.PureComponent {
  render() {
    return (
      <div className='card'>
        <div className='card__header'>
          <h3 className='card__title'>В погоне за Бенкси</h3>
          <p className='card__duration'>27 минут</p>
        </div>
        <img src={testImg} alt='a' className='card__img'></img>
        {this.props.path === '/saved-movies' ? <button className='card__btn card__btn_deleted'></button> : null}
        {this.props.added && this.props.path === '/movies' ? <button className='card__btn card__btn_checked'></button> : null}
        {!this.props.added && this.props.path === '/movies' ? <button className='card__btn'>Сохранить</button> : null}
      </div>
    )
  }
}

export default MoviesCard
