import React from 'react'
import map from 'lodash/map'
import anime, { random } from 'animejs'

import IconButton from 'material-ui/IconButton/IconButton'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'

import './StackedPictures.css'

const styles = {
  leftBtn: {
    position: 'absolute',
    zIndex: '10',
    left: '30px',
    top: '45%'
  },
  rightBtn: {
    position: 'absolute',
    zIndex: '10',
    right: '30px',
    top: '45%'
  }
}

class StackedPictures extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      picturesZIndex: []
    }
    this.prevPicture = this.prevPicture.bind(this)
    this.nextPicture = this.nextPicture.bind(this)
  }

  componentDidMount () {
    this.animeStack()
  }

  prevPicture () {
    const indexArray = this.state.picturesZIndex
    const pictureToMove = indexArray.indexOf(Math.min(...indexArray))
    anime({
      targets: `#StackedPictures_${pictureToMove}`,
      scale: [1, 0.9],
      opacity: 0.9,
      translateX: this.props.size ? `-${this.props.size}px` : '-550px',
      elasticity: 0,
      rotate: -10,
      duration: 100
    }).finished.then(() => {
      const ind = this.state.picturesZIndex
      const picturesZIndex = []
      for (let index = 0; index < ind.length; index++) {
        if (index + 1 === ind.length) {
          picturesZIndex[0] = ind[index]
          break
        }
        picturesZIndex[index + 1] = ind[index]
      }
      anime({
        targets: `#StackedPictures_${pictureToMove}`,
        scale: [0.9, 1],
        opacity: 1,
        translateX: 0,
        elasticity: 0,
        rotate: random(-1.9, 2.0),
        duration: 300
      })
      return this.setState({picturesZIndex})
    })
  }

  nextPicture () {
    const indexArray = this.state.picturesZIndex
    const pictureToMove = indexArray.indexOf(Math.max(...indexArray))
    anime({
      targets: `#StackedPictures_${pictureToMove}`,
      scale: [1, 0.9],
      opacity: 0.9,
      translateX: this.props.size ? `${this.props.size}px` : '550px',
      elasticity: 0,
      rotate: 10,
      duration: 300
    }).finished.then(() => {
      const ind = this.state.picturesZIndex
      const picturesZIndex = []
      for (let index = 0; index < ind.length; index++) {
        if (index + 1 === ind.length) {
          picturesZIndex[index] = ind[0]
          break
        }
        picturesZIndex[index] = ind[index + 1]
      }
      anime({
        targets: `#StackedPictures_${pictureToMove}`,
        scale: [0.9, 1],
        opacity: 1,
        translateX: 0,
        elasticity: 0,
        rotate: random(-1.9, 2.0),
        duration: 100
      })
      return this.setState({picturesZIndex})
    })
  }

  animeStack () {
    const stackAnim = anime.timeline()
    const {pictures} = this.props

    for (let index = 0; index < pictures.length; index++) {
      let {picturesZIndex} = this.state
      picturesZIndex[index] = index + 2
      this.setState({ picturesZIndex })
      stackAnim
      .add({
        targets: `#StackedPictures_${index}`,
        scale: [0, 1],
        elasticity: 0,
        rotate: [random(-90, 90), random(-2, 2)],
        duration: 200,
        offset: '-=100'
      })
    }
  }

  render () {
    const {pictures} = this.props
    return (
      <div
        className='StackedPictures_container'
        style={{
          height: this.props.size ? `${this.props.size}px` : '400px'
        }}>
        {pictures.length > 1
        ? <IconButton style={styles.leftBtn} onClick={this.prevPicture}><ChevronLeft color='black' /></IconButton>
        : null}
        {map(pictures, (picture, index) => {
          return (
            <div
              className='StackedPictures_picture'
              style={{
                width: this.props.size ? `${this.props.size}px` : '400px',
                zIndex: this.state.picturesZIndex[index]
              }}
              id={`StackedPictures_${index}`}
              key={`StackedPictures_${index}`}
            >
              <img style={{width: '100%'}} src={picture} alt='' />
            </div>
          )
        })}
        {pictures.length > 1
        ? <IconButton style={styles.rightBtn} onClick={this.nextPicture}><ChevronRight color='black' /></IconButton>
        : null}
      </div>
    )
  }
}

export default StackedPictures
