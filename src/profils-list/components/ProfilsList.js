import React from 'react'
import map from 'lodash/map'
import chunk from 'lodash/chunk'

import { Card, CardText } from '../../styled-components/Cards'
import ProfilPicture from '../../profil-picture/containers/ProfilPicture'
import IconButton from 'material-ui/IconButton/IconButton'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'

const styles = {
  leftBtn: {
    position: 'absolute',
    left: '5px',
    top: '45%'
  },
  rightBtn: {
    position: 'absolute',
    right: '5px',
    top: '45%'
  }
}

class ProfilList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profilsFetched: false,
      viewPage: 0,
      profils: []
    }
    this.prevGrid = this.prevGrid.bind(this)
    this.nextGrid = this.nextGrid.bind(this)
  }

  componentDidMount () {
    this.props.getProfils()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.profils) {
      const chunkedProfils = chunk(nextProps.profils, 12)
      console.log(chunkedProfils)
      const profils = map(chunkedProfils, (profils) => map(profils, (profil, index) =>
        <ProfilPicture profil={profil} key={`picture_${index}`} />
      ))
      this.setState({
        profils,
        profilsFetched: true
      })
    }
  }

  prevGrid () {
    if (this.state.viewPage === 0) {
      return this.setState({viewPage: this.state.profils.length - 1})
    }
    this.setState({viewPage: this.state.viewPage - 1})
  }
  nextGrid () {
    if (this.state.viewPage === this.state.profils.length - 1) {
      return this.setState({viewPage: 0})
    }
    this.setState({viewPage: this.state.viewPage + 1})
  }

  render () {
    console.log(this.state.profils[this.state.viewPage])
    return (
      <div style={{width: '100%', alignSelf: 'center'}}>
        <Card style={{margin: '0px'}}>
          <CardText>
            {this.state.profilsFetched
            ? <div className='gridContainer'>
              <IconButton style={styles.leftBtn} onClick={this.prevGrid}><ChevronLeft color='black' /></IconButton>
              <div className='grid-5-center'>
                {this.state.profils[this.state.viewPage]}
              </div>
              <IconButton style={styles.rightBtn} onClick={this.nextGrid}><ChevronRight color='black' /></IconButton>
            </div>
            : null}
          </CardText>
        </Card>
      </div>
    )
  }
}

export default ProfilList
