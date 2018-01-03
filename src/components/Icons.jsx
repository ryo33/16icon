import React, { Component } from 'react'
import { connect } from 'react-redux'
import { svgAsPngUri } from 'save-svg-as-png'
import Modal from 'react-modal'

const mapStateToProps = ({matrix}, props) => {
  return {matrix, ...props}
}

const Icon = ({ id, matrix, onClick, width='200px', height='200px' }) => {
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
  const viewBox = `0 0 ${matrix[0].length} ${matrix.length}`
  return (
    <span>
      <a onClick={onClick}>
        <svg id={id} style={{width, height}}
          viewBox={viewBox} width={width} height={height}>
          {svgMatrix}
        </svg>
      </a>
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
    const opts = {
      scale: 32
    }
    svgAsPngUri(document.getElementById(id), opts, uri => {
      this.setState({imageUri: uri})
    })
  }
  handleClose() {
    this.setState({imageUri: null})
  }
  render() {
    const { matrix, ...props } = this.props
    const { imageUri } = this.state
    const modalStyle = {
      content: {
        position: 'fixed',
        top: '40px',
        left: '40px',
        width: '256px',
        height: '256px',
        borderRadius: '0px',
        padding: '0px'
      }
    }
    const imgStyle = {
      border: '3px solid #333',
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
              matrix={matrix} {...props} />
          )
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Icons)
