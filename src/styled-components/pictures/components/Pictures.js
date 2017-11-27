import React from 'react'
import ImagesUploader from 'react-images-uploader'
import 'react-images-uploader/styles.css'
import 'react-images-uploader/font.css'

class Pictures extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pictures: []
    }
  }
  render () {
    return (
      <ImagesUploader
        url='http://localhost:9090/multiple'
        optimisticPreviews
        multiple
        images={this.state.pictures}
        onLoadEnd={(err) => {
          if (err) {
            console.error(err)
          }
        }}
        label='Upload multiple images'
        />
    )
  }
}

export default Pictures
