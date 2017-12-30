import React from 'react'
import InputRange from 'react-input-range'

import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardText, CardHeader } from '../../styled-components/Cards'
import SearchIcon from 'material-ui/svg-icons/action/search'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import SearchTags from '../../styled-components/tags/component/SearchTags'

import Profils from '../../profils-list/containers/ProfilList'

import 'react-input-range/lib/css/index.css'
import './Finder.css'

class Finder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ageRange: {
        min: 20,
        max: 55
      },
      rangeDistance: 60,
      location: null,
      departments: [],
      userZip: null,
      tags: []
    }
    this.handleTagChange = this.handleTagChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount () {
    this.setState({location: this.props.location})
  }

  handleTagChange (tags) {
    this.setState({tags})
  }

  handleSearch () {
    this.props.searchProfils({
      ageRange: this.state.ageRange,
      rangeDistance: this.state.rangeDistance,
      tags: this.state.tags
    })
  }

  render () {
    return (
      <div style={{width: '80%', alignSelf: 'center', marginBottom: '270px'}}>
        <Card
          style={{
            padding: '0px',
            border: 'none',
            backgroundColor: 'inherit',
            boxShadow: '0'
          }}>
          <CardHeader
            actAsExpander
            style={{
              backgroundColor: '#79A5C5',
              color: '#ffffff',
              boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
            }}
            showExpandableButton
            closeIcon={<SearchIcon color='#ffffff' />}
            openIcon={<CloseIcon color='#ffffff' />}
          >
            Recherche
          </CardHeader>
          <CardText
            expandable
            style={{
              width: '99%',
              alignSelf: 'center',
              padding: '20px 50px',
              backgroundColor: '#ffffff',
              margin: '0 auto',
              boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: '20px'
              }}>
              <div className='Finder__intervalContainer'>
                <div className='Finder__displayRowCenter'>
                  <div className='Finder__searchTitle'>Age</div>
                  <InputRange
                    maxValue={80}
                    minValue={18}
                    formatLabel={value => `${value} ans`}
                    value={this.state.ageRange}
                    onChange={value => this.setState({ ageRange: value })}
                  />
                </div>
              </div>
              <div className='Finder__intervalContainer'>
                <div className='Finder__displayRowCenter'>
                  <div className='Finder__searchTitle'>Distance</div>
                  <InputRange
                    maxValue={1000}
                    minValue={10}
                    step={10}
                    formatLabel={value => `${value}km`}
                    value={this.state.rangeDistance}
                    onChange={value => this.setState({ rangeDistance: value })}
                  />
                </div>
              </div>
            </div>
            <div className='Finder__tagContainer'>
              <SearchTags handleChange={this.handleTagChange} />
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <RaisedButton
                disabled={this.props.profilsRequesting}
                onClick={this.handleSearch}
                label='Valider'
                backgroundColor='#79A5C5'
                labelColor='#ffffff'
                style={{marginTop: '20px'}}
              />
            </div>
          </CardText>
        </Card>
        <Profils />
      </div>
    )
  }
}

export default Finder
