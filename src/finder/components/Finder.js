import React from 'react'
import InputRange from 'react-input-range'

import Tags from '../containers/Tags'

import { Card, CardHeader, CardText } from '../../styled-components/Cards'

import 'react-input-range/lib/css/index.css'

class Finder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      oldRange: {
        min: 20,
        max: 55
      },
      tags: []
    }
  }

  render () {
    return (
      <div style={{width: '70%', alignSelf: 'center'}}>
        <Card>
          <CardHeader>Intervale</CardHeader>
          <CardText>
            <InputRange
              maxValue={80}
              minValue={18}
              formatLabel={value => `${value} ans`}
              value={this.state.oldRange}
              onChange={value => this.setState({ oldRange: value })}
              onChangeComplete={value => console.log(value)} />
          </CardText>
        </Card>
        <Card>
          <CardHeader>Par tag</CardHeader>
          <CardText>
            <Tags />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default Finder
