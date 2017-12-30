import React from 'react'
import { Route } from 'react-router'
import ProfilEdit from '../containers/ProfilEdit'
import ProfilView from '../containers/ProfilView'

import './Profil.css'

class Profil extends React.Component {
  render () {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <div className='Home__contentContainer'>
          <Route exact path='/dashboard/profil' component={ProfilEdit} />
          <Route path='/dashboard/profil/:userId/' component={ProfilView} />
        </div>
      </div>
    )
  }
}

export default Profil
