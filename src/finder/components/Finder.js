import React from 'react'
import InputRange from 'react-input-range'
import axios from 'axios'
import map from 'lodash/map'

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
      departments: [],
      userLocation: null,
      userZip: null,
      tags: []
    }
    this.handleTagChange = this.handleTagChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.getUserDepartement = this.getUserDepartement.bind(this)
  }

  componentDidMount () {
    this.setState({location: this.props.location})
    this.getDepartments()
    if (this.props.location && this.props.location.zip) this.getUserDepartement(this.props.location.zip)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.location && nextProps.location && nextProps.location.zip) this.getUserDepartement(nextProps.location.zip)
  }
  handleTagChange (tags) {
    this.setState({tags})
  }

  handleSelectChange (event, index, value) {
    this.setState({location: value})
  }

  getDepartments () {
    return axios({
      method: 'get',
      url: 'https://geo.api.gouv.fr/departements'
    })
    .then((departments) => {
      this.setState({departments: departments.data})
    })
    .catch((err) => console.log(err))
  }

  getUserDepartement (zip) {
    this.setState({userZip: zip})
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
              <SearchTags handleChange={this.handleTagChange} />
            </div>
            <div className='Finder__locationContainer'>
              <Select
                floatingLabelText='Localité'
                value={this.state.userZip && this.state.userZip.substr(0, 2)}
                onChange={this.handleSelectChange}
                fullWidth
              >
                <MenuItem key={'FR'} value={'FR'} primaryText='France' />
                {
                  map(this.state.departments, (department, index) =>
                    <MenuItem key={index} value={department.code} primaryText={department.nom} />)
                }
              </Select>
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default Finder
