import React from 'react'
import map from 'lodash/map'

import ProfilPicture from '../../profil/containers/ProfilPicture'

class ProfilList extends React.Component {
  render () {
    return (
      this.props.profils && this.props.profils.length !== 0
      ? <div className='gridContainer'>
        <div className='grid-4-center'>
          {
            map(this.props.profils, (profil, index) => {
              return <ProfilPicture profil={profil} key={`picture_${index}`} />
            })
          }
        </div>
      </div>
      : <div>Aucun profil ne correspond.</div>
    )
  }
}

export default ProfilList
