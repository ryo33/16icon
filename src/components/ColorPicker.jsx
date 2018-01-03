import React, { Component } from 'react'
import { SketchPicker } from 'react-color'
import { connect } from 'react-redux'

import { changeColor } from '../reducers'

const mapStateToProps = ({ base }) => {
  return {base}
}
const mapDispatchToProps = {
  changeColor
}

class ColorPicker extends Component {
  handleChange = ({hsl}) => {
    const { changeColor } = this.props
    changeColor(hsl)
  }
  render() {
    const { base } = this.props
    return <SketchPicker color={base} onChange={::this.handleChange} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)
