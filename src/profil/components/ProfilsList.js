import React from 'react'
import map from 'lodash/map'
import chunk from 'lodash/chunk'
import shuffle from 'lodash/shuffle'

import { Card, CardText } from '../../styled-components/Cards'
import ProfilPicture from '../containers/ProfilPicture'
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
      const chunkedProfils = chunk(shuffle(nextProps.profils), 12)
      const profils = map(chunkedProfils, (profils) => map(profils, (profil, index) => profil))
      this.setState({
        profils,
        profilsFetched: true,
        viewPage: 0
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
    return (
      this.state.profils.length !== 0
      ? <div style={{width: '100%', alignSelf: 'center'}}>
        {!this.props.profilRequesting
        ? <Card style={{margin: '0px'}}>
          <CardText>
            {this.state.profilsFetched
            ? <div className='gridContainer'>
              <IconButton style={styles.leftBtn} onClick={this.prevGrid}><ChevronLeft color='black' /></IconButton>
              <div className='grid-5-center'>
                {
                  map(this.state.profils[this.state.viewPage], (profil, index) =>
                    <ProfilPicture profil={profil} key={`picture_${index}`} />)
                }
              </div>
              <IconButton style={styles.rightBtn} onClick={this.nextGrid}><ChevronRight color='black' /></IconButton>
            </div>
            : null}
          </CardText>
        </Card>
        : null}
      </div>
    : <div>Aucun profil ne correspond a votre recherche.</div>
    )
  }
}

export default ProfilList
