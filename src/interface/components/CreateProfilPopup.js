import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class DialogExampleCustomWidth extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  handleOpen () { this.setState({open: true}) }

  handleClose () { this.setState({open: false}) }

  render () {
    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label='Submit'
        primary
        onClick={this.handleClose}
      />
    ]

    return (
      <Dialog
        title='Dialog With Custom Width'
        actions={actions}
        modal
        open={this.state.open}
      >
        This dialog spans the entire width of the screen.
      </Dialog>
    )
  }
}
