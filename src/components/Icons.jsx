import React from 'react'
import { connect } from 'react-redux'

import SaveButton from './SaveButton'

const mapStateToProps = ({matrix}, props) => {
  return {matrix, ...props}
}

const Icon = ({ id, matrix, width='200px', height='200px' }) => {
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
      <svg id={id} style={{width, height}} viewBox={viewBox}>
        {svgMatrix}
      </svg>
      <SaveButton targetId={id} />
    </span>
  )
}

const Icons = ({ matrix, ...props }) => {
  return (
    <div>
      {matrix.map((matrix, i) => {
        return (
          <Icon id={`matrix-${i}`} matrix={matrix} {...props} />
        )
      })}
    </div>
  )
}

export default connect(mapStateToProps)(Icons)
