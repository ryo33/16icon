import React, { Component } from 'react'
import { connect } from 'react-redux'

import { refresh } from '../reducers'

const mapDispatchToProps = {
  refresh
}

class RefreshButton extends Component {
  handleClick() {
    const { refresh } = this.props
    refresh()
  }
  render() {
    const buttonStyle = {
      width: '80px',
      height: '40px',
      margin: '5px 0px'
    }
    return <button onClick={::this.handleClick} style={buttonStyle}>Refresh</button>
  }
}

export default connect(null, mapDispatchToProps)(RefreshButton)
