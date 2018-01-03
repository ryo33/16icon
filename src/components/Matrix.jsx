import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({matrix}, props) => {
  return {matrix, ...props}
}

const Matrix = ({ matrix, width='200px', height='200px' }) => {
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
  return <svg style={{width, height}} viewBox={viewBox}>
    {svgMatrix}
  </svg>
}

export default connect(mapStateToProps)(Matrix)
