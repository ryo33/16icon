import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateImageUrl } from '../reducers'

const mapStateToProps = ({ width, height }) => {
  return {width, height}
}

const mapDispatchToProps = {
  updateImageUrl
}

class ImageInput extends Component {
  handleChange(event) {
    if (event.target.files.length == 0) return
    const file = event.target.files[0]
    const { width, height, updateImageUrl } = this.props
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      updateImageUrl(reader.result)
    })
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <input type="file" accept="image/*" onChange={::this.handleChange} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageInput)
