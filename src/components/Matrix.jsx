import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({matrix, width, height}) => {
  return {matrix, width, height}
}

const size = 64

const Matrix = ({ matrix, width, height }) => {
  const svgMatrix = matrix.reduce((acc, line, y) => {
    acc.push(line.map(({ h, s, l }, x) => (
      <rect
        key={`${x}-${y}`}
        x={x*size} y={y*size}
        width={`${size}px`}
        height={`${size}px`}
        fill={`hsl(${h}, ${Math.round(100*s)}%, ${Math.round(100*l)}%)`}
      />
    )))
    return acc
  }, [])
  return <svg style={{width: `${width*size}px`, height:`${height*size}px`}}>
    {svgMatrix}
  </svg>
}

export default connect(mapStateToProps)(Matrix)
