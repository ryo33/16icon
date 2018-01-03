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
    return <button onClick={::this.handleClick}>Refresh</button>
  }
}

export default connect(null, mapDispatchToProps)(RefreshButton)
