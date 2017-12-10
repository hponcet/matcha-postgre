import React from 'react'
import InputRange from 'react-input-range'

import { Card, CardText } from '../../styled-components/Cards'
import Select from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import SearchTags from '../../styled-components/tags/component/SearchTags'

import 'react-input-range/lib/css/index.css'
import './Finder.css'

class Finder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      oldRange: {
        min: 20,
        max: 55
      },
      location: null,
      tags: []
    }
  }

  componentDidMount () {
    this.setState({location: this.props.location})
  }

  handleChange (data) {
    console.log(data)
  }

  render () {
    return (
      <div style={{width: '70%', alignSelf: 'center'}}>
        <Card>
          <CardText>
            <div className='Finder__intervalContainer'>
              <InputRange
                maxValue={80}
                minValue={18}
                formatLabel={value => `${value} ans`}
                value={this.state.oldRange}
                onChange={value => this.setState({ oldRange: value })}
                onChangeComplete={value => console.log(value)} />
            </div>
            <div className='Finder__tagContainer'>
              <SearchTags handleChange={this.handleChange} />
            </div>
            <div className='Finder__locationContainer'>
              <Select
                floatingLabelText='Sexe *'
                value={this.state.location}
                onChange={this.handleSelectChange}
                fullWidth
              >
                <MenuItem value={'1'} primaryText='Homme' />
                <MenuItem value={'2'} primaryText='Femme' />
              </Select>
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default Finder
