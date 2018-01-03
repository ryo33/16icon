import bm from 'box-muller'

const limit = (value, min, max) => Math.min(Math.max(value, min), max)
const nd = (mean, sd) => sd * bm() + mean
const applyNormalDistribution = ({ h, s, l }, { h: hsd, s: ssd, l: lsd }) => {
  return {
    h: (360 + nd(h, hsd)) % 360,
    s: limit(nd(s, ssd), 0, 1),
    l: limit(nd(l, lsd), 0, 1)
  }
}
const createMatrix = ({ base, length, height, width, standardDeviations }) =>
  Array(length).fill().map(() =>
    Array(height).fill().map(() =>
      Array(width).fill().map(() =>
        applyNormalDistribution(base, standardDeviations))))

const initialState = {
  base: {h: -14.25, s: 0.52, l: 0.28},
  standardDeviations: {h: 39.83, s: 0.31, l: 0.13},
  length: 1,
  height: 4,
  width: 4,
  matrix: []
}
initialState.matrix = createMatrix(initialState)

const refresh = () => (state) => {
  return {...state, matrix: createMatrix(state)}
}

const updateStandardDeviation = (name, value) => (state) => {
  const { standardDeviations } = state
  return {...state, standardDeviations: {...standardDeviations, [name]: value}}
}

const changeColor = (hsl) => (state) => {
  return {...state, base: hsl}
}

export const updateLength = (length) => (state) => {
  return refresh()({...state, length})
}

export const updateWidth = (width) => (state) => {
  return refresh()({...state, width})
}

export const updateHeight = (height) => (state) => {
  return refresh()({...state, height})
}

export {
  initialState,
  updateStandardDeviation,
  changeColor,
  refresh
}
