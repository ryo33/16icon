import React, { Component } from 'react'
import { connect } from 'react-redux'
import { svgAsPngUri } from 'save-svg-as-png'
import Modal from 'react-modal'

const mapStateToProps = ({matrix, width, height}, props) => {
  return {matrix, width, height, ...props}
}

const Icon = ({ id, matrix, width, height, onClick, sizeBase=16 }) => {
  const svgMatrix = matrix.reduce((acc, line, y) => {
    acc.push(line.map(({ h, s, l }, x) => (
      <rect
        key={`${x}-${y}`}
        x={x} y={y}
        width={1}
        height={1}
        fill={`hsl(${h}, ${Math.round(100*s)}%, ${Math.round(100*l)}%)`}
      />
    )))
    return acc
  }, [])
  const viewBox = `0 0 ${width} ${height}`
  const iconStyle = {
    width: `${width*sizeBase}px`,
    height: `${height*sizeBase}px`,
    padding: '2px', margin: '1px'
  }
  return (
    <span style={iconStyle}>
      <svg id={id}
        onClick={onClick}
        viewBox={viewBox} width={width*sizeBase} height={height*sizeBase}>
        {svgMatrix}
      </svg>
    </span>
  )
}

class Icons extends Component {
  constructor() {
    super()
    this.state = {
      imageUri: null
    }
  }
  handleClick(id) {
    const { pngSizeBase } = this.props
    const opts = {
      scale: pngSizeBase
    }
    svgAsPngUri(document.getElementById(id), opts, uri => {
      this.setState({imageUri: uri})
    })
  }
  handleClose() {
    this.setState({imageUri: null})
  }
  render() {
    const { matrix, width, height,
      previewSizeBase, pngSizeBase, ...props } = this.props
    const { imageUri } = this.state
    const modalStyle = {
      content: {
        position: 'fixed',
        width: `${width*pngSizeBase}px`,
        height: `${height*pngSizeBase}px`,
        margin: 'auto',
        borderRadius: '0px',
        padding: '0px'
      }
    }
    const imgStyle = {
      border: '2px solid #222',
      width: '100%',
      height: '100%'
    }
    return (
      <div>
        {imageUri ? (
          <Modal
            ariaHideApp={false}
            isOpen={true}
            onRequestClose={::this.handleClose}
            style={modalStyle}
          >
            <img src={imageUri} style={imgStyle}
              onClick={::this.handleClose}
            />
          </Modal>
        ) : null}
        {matrix.map((matrix, i) => {
          const id = `matrix-${i}`
          return (
            <Icon key={i} id={id}
              onClick={() => this.handleClick(id)}
              matrix={matrix}
              width={width}
              height={height}
              sizeBase={previewSizeBase}
              {...props} />
          )
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Icons)
