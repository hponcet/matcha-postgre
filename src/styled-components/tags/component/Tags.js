import React from 'react'
import { connect } from 'react-redux'
import { fetchTags, updateTag, addTag, removeTag } from '../actions'

import AutoComplete from 'material-ui/AutoComplete'

const style = {
  container: {
    width: '100%'
  },
  tagsContainer: {
    padding: '10px',
    display: 'flex',
    borderRadius: '5px',
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
  }

  componentDidMount () {
    this.props.fetchTags()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.suggestions) {
      this.setState({suggestions: nextProps.suggestions})
    }
  }

  handleInputChange (inputValue) { this.setState({inputValue}) }
  handleNewRequest () { this.setState({inputValue: ''}) }

  handleComponentChange (event) {
    const {tags, inputValue} = this.state
    this.updateSuggestions(inputValue)
    tags.push(inputValue)
    this.setState({tags, inputValue: ''})
    this.props.handleChange({
      target: {
        value: tags,
        name: this.props.componentName
      }
    })
    this.handleNewRequest()
    event.preventDefault()
  }

  updateSuggestions (tagName) {
    const suggestions = this.state.suggestions
    if (suggestions[tagName]) {
      if (this.props.id) {
        suggestions[tagName].ids.push(this.props.id)
        this.props.updateTag(tagName, this.props.id)
      }
    } else {
      const newTag = {
        name: tagName,
        ids: [this.props.id]
      }
      suggestions[tagName] = newTag
      this.props.addTag(newTag)
    }
    this.setState({suggestions})
  }

  render () {
    return (
      <div style={style.container}>
        <div style={style.tagsContainer}>
          {
            this.state.tags.map((tag, index) => {
              return <div key={index} style={style.tag}>{tag}</div>
            })
          }
        </div>
        <form onSubmit={this.handleComponentChange}>
          <AutoComplete
            hintText={`Choisissez un interret...`}
            searchText={this.state.inputValue}
            dataSource={this.state.suggestions}
            onUpdateInput={this.handleInputChange}
            openOnFocus
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
    id: state.user.id
  }), {
    fetchTags,
    updateTag,
    addTag,
    removeTag
  }
)(Tags)
