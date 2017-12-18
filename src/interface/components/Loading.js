import React from 'react'
import CircularLoader from 'material-ui/CircularProgress'

const style = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }
}
const Loading = () => {
  return (
    <div style={style.container}>
      <CircularLoader size={80} thickness={10} />
    </div>
  )
}

export default Loading
