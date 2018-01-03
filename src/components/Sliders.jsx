import React, { Component } from 'react'
import { connect } from 'react-redux'
import RCSlider from 'rc-slider'
import 'rc-slider/assets/index.css';

import { updateStandardDeviation } from '../reducers'

const toHecto = value => Math.round(value * 100)
const fromHecto = value => value / 100

const mapStateToProps = ({ standardDeviations }) => {
  return {standardDeviations}
}
const mapDispatchToProps = {
  updateStandardDeviation
}

class Sliders extends Component {
  handleChangeH(value) {
    const { updateStandardDeviation } = this.props
    updateStandardDeviation('h', value)
  }
  handleChangeS(value) {
    const { updateStandardDeviation } = this.props
    updateStandardDeviation('s', fromHecto(value))
  }
  handleChangeL(value) {
    const { updateStandardDeviation } = this.props
    updateStandardDeviation('l', fromHecto(value))
  }
  render() {
    const {standardDeviations: { h, s, l }} = this.props
    // TODO Use `<></>` instead of `<div></div>`.
    return (
      <div>
        <div>
          <RCSlider
            onChange={::this.handleChangeH}
            value={h} min={0} max={360}
          />
        </div>
        <div>
          <RCSlider
            onChange={::this.handleChangeS}
            value={toHecto(s)} min={0} max={100}
          />
        </div>
        <div>
          <RCSlider
            onChange={::this.handleChangeL}
            value={toHecto(l)} min={0} max={100}
          />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sliders)
