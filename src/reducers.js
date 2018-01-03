import bm from 'box-muller'

const initialBase = {h: 0, s: 1.0, l: 0.5}
const initialHeight = 4
const initialWidth = 4
const initialStandardDeviations = {h: 20, s: 0.2, l: 0.15}

const limit = (value, min, max) => Math.min(Math.max(value, min), max)
const nd = (mean, sd) => sd * bm() + mean
const applyNormalDistribution = ({ h, s, l }, { h: hsd, s: ssd, l: lsd }) => {
  return {
    h: (360 + nd(h, hsd)) % 360,
    s: limit(nd(s, ssd), 0, 1),
    l: limit(nd(l, lsd), 0, 1)
  }
}
const createMatrix = ({ base, height, width, standardDeviations }) =>
  Array(initialHeight).fill().map(() =>
    Array(initialWidth).fill().map(() =>
      applyNormalDistribution(base, standardDeviations)))

const initialState = {
  base: initialBase,
  height: initialHeight,
  width: initialWidth,
  standardDeviations: initialStandardDeviations,
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

export {
  initialState,
  updateStandardDeviation,
  changeColor,
  refresh
}
