import React from 'react'
import { connect } from 'react-redux'
import { fetchTags, updateTag, addTag, removeTag } from '../actions'
import findIndex from 'lodash/findIndex'
import map from 'lodash/map'

import AutoComplete from 'material-ui/AutoComplete'
import Chip from 'material-ui/Chip'

const style = {
  container: {
    width: '100%'
  },
  tagsContainer: {
    padding: '10px',
    display: 'flex',
    borderRadius: '5px',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  tag: {
    padding: '10px',
    border: '1px solid grey',
    margin: '5px'
  }
}

class Tags extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: [],
      suggestions: [],
      inputValue: ''
    }
    this.handleComponentChange = this.handleComponentChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleNewRequest = this.handleNewRequest.bind(this)
    this.handleRequestDelete = this.handleRequestDelete.bind(this)
  }

  componentDidMount () {
    this.props.fetchTags()
    if (this.props.tags) this.setState({tags: this.props.tags})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.suggestions) {
      this.setState({suggestions: nextProps.suggestions})
    }
    if (nextProps.tags) {
      this.setState({tags: nextProps.tags})
    }
  }

  handleInputChange (inputValue) { this.setState({inputValue}) }
  handleNewRequest () { this.setState({inputValue: ''}) }

  handleComponentChange (event) {
    const {tags, inputValue} = this.state
    if (this.updateSuggestions(inputValue)) return this.handleNewRequest()
    tags.push(inputValue)
    this.setState({tags, inputValue: ''})
    this.handleNewRequest()
    event.preventDefault()
  }

  handleRequestDelete (index) {
    const tags = this.state.tags
    this.deleteSuggestions(tags[index])
    tags.splice(index, 1)
    this.setState({tags})
  }

  deleteSuggestions (tagName) {
    const suggestions = this.state.suggestions
    if (!suggestions.find((tag) => tag.name === tagName)) return
    const tagNameId = findIndex(suggestions, {name: tagName})
    if (!suggestions[tagNameId].ids.find((id) => id === this.props.id)) return
    const idIndex = suggestions[tagNameId].ids.indexOf(this.props.id)
    suggestions[tagNameId].ids.splice(idIndex, 1)
    this.props.removeTag(tagName, this.props.id)
    this.setState({suggestions})
  }

  parseSuggestions () {
    return map(this.props.suggestions, (suggestion) => suggestion.name)
  }

  updateSuggestions (tagName) {
    const suggestions = this.state.suggestions
    if (suggestions.find((tag) => tag.name === tagName)) {
      const tagNameId = findIndex(suggestions, {name: tagName})
      if (suggestions[tagNameId].ids.find((id) => id === this.props.id)) return true
      suggestions[tagNameId].ids.push(this.props.id)
      this.props.updateTag(tagName, this.props.id)
    } else {
      const newTag = {
        name: tagName,
        ids: [this.props.id]
      }
      suggestions.push(newTag)
      this.props.addTag(tagName, this.props.id)
    }
    this.setState({suggestions})
    return false
  }

  render () {
    return (
      <div style={style.container}>
        <div style={style.tagsContainer}>
          {
            this.state.tags.map((tag, index) => {
              return <Chip
                style={{margin: '4px'}}
                key={index}
                onRequestDelete={() => this.handleRequestDelete(index)}>{tag}</Chip>
            })
          }
        </div>
        <form onSubmit={this.handleComponentChange}>
          <AutoComplete
            hintText={`Centre d'interet`}
            searchText={this.state.inputValue}
            dataSource={this.parseSuggestions()}
            onUpdateInput={this.handleInputChange}
            openOnFocus={false}
          />
          <button type='submit' style={{display: 'none'}} />
        </form>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    suggestions: state.tags.data,
    tags: state.profil.tags,
    id: state.user.id
  }), {
    fetchTags,
    updateTag,
    addTag,
    removeTag
  }
)(Tags)
