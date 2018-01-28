import React from 'react'
import { connect } from 'react-redux'
import { fetchTags, addTag, removeTag } from '../actions'

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
    this.handleAddTag = this.handleAddTag.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDeleteTag = this.handleDeleteTag.bind(this)
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

  handleInputChange (inputValue) {
    if (!this.state.inputValue && inputValue === ' ') return
    this.setState({inputValue})
  }

  handleAddTag (event) {
    event.preventDefault()
    const {tags, inputValue} = this.state
    if (!inputValue || tags.indexOf(inputValue) > -1) return this.setState({inputValue: ''})
    tags.push(inputValue)
    this.props.addTag(inputValue)
    this.setState({tags, inputValue: ''})
  }

  handleDeleteTag (index) {
    const {tags} = this.state
    this.props.removeTag(tags[index])
    tags.splice(index, 1)
    this.setState({tags})
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
                onRequestDelete={() => this.handleDeleteTag(index)}>{tag}</Chip>
            })
          }
        </div>
        <form onSubmit={this.handleAddTag}>
          <AutoComplete
            hintText={`Centre d'interet`}
            searchText={this.state.inputValue}
            dataSource={this.props.suggestions}
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
    suggestions: state.tags.tags,
    tags: state.profil.tags,
    id: state.user.id
  }), {
    fetchTags,
    addTag,
    removeTag
  }
)(Tags)
