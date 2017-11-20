import React from 'react'
import Menu from '../containers/Menu'
import { Route } from 'react-router'
import HomeGrid from './HomeGrid'
import './Home.css'

class Home extends React.Component {
  componentWillMount () {
    this.props.fetchUser()
  }

  render () {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Menu />
        <div className='Home__contentContainer'>
          <Route exact path='/home' component={HomeGrid} />
        </div>
      </div>
    )
  }
}

export default Home
