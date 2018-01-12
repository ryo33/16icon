import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  updateLength,
  updateWidth,
  updateHeight
} from '../reducers'
import NumericInput from 'react-numeric-input'

const mapStateToProps = ({ length, width, height }) => {
  return { length, width, height }
}

const mapDispatchToProps = {
  updateLength,
  updateWidth,
  updateHeight
}

class Numeric extends Component {
  handleClick(value) {
    const { update } = this.props
    update(value)
  }
  render() {
    const { text } = this.props
    return <button onClick={::this.handleClick}>{text}</button>
  }
}

class NumericInputs extends Component {
  handleChangeLength(value) {
    const { updateLength } = this.props
    if (value > 0)
      updateLength(value)
  }
  handleChangeWidth(value) {
    const { updateWidth } = this.props
    if (value > 0)
      updateWidth(value)
  }
  handleChangeHeight(value) {
    const { updateHeight } = this.props
    if (value > 0)
      updateHeight(value)
  }
  render() {
    const { length, width, height } = this.props
    return (
      <div>
        <NumericInput
          min={1} value={length}
          onChange={::this.handleChangeLength}
        />
        <NumericInput
          min={1} value={width}
          onChange={::this.handleChangeWidth}
        />
        <NumericInput
          min={1} value={height}
          onChange={::this.handleChangeHeight}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NumericInputs)
