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
        <button className='card__btn'>Сохранить</button>
      </div>
    )
  }
}

export default MoviesCard
