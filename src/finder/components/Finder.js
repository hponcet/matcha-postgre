import React from 'react'
import InputRange from 'react-input-range'

import { historyPush } from '../../config/history'

import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardText, CardHeader } from '../../styled-components/Cards'
import { SelectField, MenuItem } from 'material-ui'
import SearchTags from '../../styled-components/tags/component/SearchTags'

import SearchIcon from 'material-ui/svg-icons/action/search'
import IconButton from 'material-ui/IconButton/IconButton'
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'

import ProfilList from './ProfilsList'

import 'react-input-range/lib/css/index.css'
import './Finder.css'

class Finder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSearch: false,
      ageRange: {
        min: 20,
        max: 55
      },
      rangeDistance: 60,
      location: null,
      tags: [],
      order: 0
    }
    this.handleTagChange = this.handleTagChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.prevOffset = this.prevOffset.bind(this)
    this.nextOffset = this.nextOffset.bind(this)
    this.handleOrder = this.handleOrder.bind(this)
  }

  componentDidMount () {
    if (this.props.pictures.length < 1) {
      historyPush('/dashboard/profil?emptypics=1')
    }
    this.props.getProfils(this.state.offset, this.state.order)
    this.setState({location: this.props.location})
  }

  handleTagChange (tags) { this.setState({tags}) }

  handleSearch () {
    this.props.searchProfils({
      offset: 0,
      order: this.state.order,
      ageRange: this.state.ageRange,
      rangeDistance: this.state.rangeDistance,
      tags: this.state.tags
    })
  }

  nextOffset () {
    if (this.state.showSearch) {
      return this.props.searchProfils({
        offset: this.props.offset + 12,
        order: this.state.order,
        ageRange: this.state.ageRange,
        rangeDistance: this.state.rangeDistance,
        tags: this.state.tags
      })
    }
    this.props.getProfils(this.props.offset + 12, this.state.order)
  }
  prevOffset () {
    if (this.state.showSearch && this.props.offset > 11) {
      return this.props.searchProfils({
        offset: this.props.offset - 12,
        order: this.state.order,
        ageRange: this.state.ageRange,
        rangeDistance: this.state.rangeDistance,
        tags: this.state.tags
      })
    }
    if (this.props.offset > 11) this.props.getProfils(this.props.offset - 12, this.state.order)
  }
  handleOrder (event, index, value) {
    this.setState({order: value})
    if (!this.state.showSearch) return this.props.getProfils(this.props.offset || 0, value)
    this.props.searchProfils({
      offset: this.props.offset,
      order: value,
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
            style={{
              backgroundColor: '#79A5C5',
              color: '#ffffff',
              boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
            }}
            showExpandableButton
            closeIcon={
              <SearchIcon
                onClick={() => { this.setState({showSearch: true}) }}
                color='#ffffff'
              />}
            openIcon={
              <CloseIcon
                onClick={() => { this.setState({showSearch: false}) }}
                color='#ffffff'
              />}
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
                disabled={this.props.searching}
                onClick={this.handleSearch}
                label='Valider'
                backgroundColor='#79A5C5'
                labelColor='#ffffff'
                style={{marginTop: '20px'}}
              />
            </div>
          </CardText>
        </Card>
        <Card style={{margin: '0px'}}>
          <CardText>
            <ProfilList profils={this.props.profils} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton onClick={this.prevOffset} disabled={this.props.offset < 11}><ChevronLeft color='black' /></IconButton>
              <SelectField
                style={{ width: '120px' }}
                floatingLabelText='Trier par'
                autoWidth
                value={this.state.order}
                onChange={this.handleOrder}
              >
                <MenuItem value={0} primaryText={<div className='Finder_MenuItems'><ArrowUp color='grey' /> Distance</div>} />
                <MenuItem value={1} primaryText={<div className='Finder_MenuItems'><ArrowDown color='grey' /> Distance</div>} />
                <MenuItem value={2} primaryText={<div className='Finder_MenuItems'><ArrowUp color='grey' /> Age</div>} />
                <MenuItem value={3} primaryText={<div className='Finder_MenuItems'><ArrowDown color='grey' /> Age</div>} />
                <MenuItem value={4} primaryText={<div className='Finder_MenuItems'><ArrowUp color='grey' /> Intérets</div>} />
                <MenuItem value={5} primaryText={<div className='Finder_MenuItems'><ArrowDown color='grey' /> Intérets</div>} />
                <MenuItem value={6} primaryText={<div className='Finder_MenuItems'><ArrowUp color='grey' /> Score</div>} />
                <MenuItem value={7} primaryText={<div className='Finder_MenuItems'><ArrowDown color='grey' /> Score</div>} />
              </SelectField>
              <IconButton onClick={this.nextOffset}><ChevronRight color='black' /></IconButton>
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default Finder
