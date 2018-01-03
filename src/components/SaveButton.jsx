import React, { Component } from 'react'
import { saveSvgAsPng } from 'save-svg-as-png'

class SaveButton extends Component {
  handleClick = () => {
    const { targetId } = this.props
    console.log(targetId)
    console.log(document.getElementById(targetId))
    saveSvgAsPng(document.getElementById(targetId), '16icon.png')
  }
  render() {
    return <button onClick={::this.handleClick}>Save</button>
  }
}

export default SaveButton
