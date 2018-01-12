import bm from 'box-muller'
import cc from 'color-convert'
import loadImage from 'image-promise'

const initialBase = {h: -14.25, s: 0.52, l: 0.28}
const limit = (value, min, max) => Math.min(Math.max(value, min), max)
const nd = (mean, sd) => sd * bm() + mean
const applyNormalDistribution = ({ h, s, l }, { h: hsd, s: ssd, l: lsd }) => {
  return {
    h: (360 + nd(h, hsd)) % 360,
    s: limit(nd(s, ssd), 0, 1),
    l: limit(nd(l, lsd), 0, 1)
  }
}
const createMatrix = ({ baseMatrix, length, height, width, standardDeviations }) =>
  Array(length).fill().map(() =>
    baseMatrix.map(line =>
      line.map(base =>
        applyNormalDistribution(base, standardDeviations))))
const createBaseMatrix = ({ base, height, width }) =>
  Array(height).fill().map(() =>
    Array(width).fill().map(() => base))

const initialState = {
  imageUrl: null,
  base: initialBase,
  baseMatrix: [],
  standardDeviations: {h: 20, s: 0.3, l: 0.1},
  length: 1,
  height: 4,
  width: 4,
  matrix: []
}
initialState.baseMatrix = createBaseMatrix(initialState)
initialState.matrix = createMatrix(initialState)
export {initialState}

export const refresh = () => state => {
  return {...state, matrix: createMatrix(state)}
}

export const refreshBaseMatrix = () => state => async (dispatch, _getState) => {
  const { width, height, imageUrl } = state
  if (imageUrl) {
    loadImage(imageUrl).then(image => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, width, height)
      const { data } = ctx.getImageData(0, 0, width, height)
      let i = 0
      const baseMatrix = Array(height).fill().map(() =>
        Array(width).fill().map(() => {
          const [ h, s, l ] = cc.rgb.hsl([data[i++], data[i++], data[i++]])
          i ++ // skip alpha channel
          return {h, s: s/100, l: l/100}
        }))
      dispatch(updateBaseMatrix(baseMatrix))
      dispatch(refresh())
    })
  } else {
    dispatch(state => ({...state, baseMatrix: createBaseMatrix(state)}))
  }
}

export const updateStandardDeviation = (name, value) => state => {
  const { standardDeviations } = state
  return {...state, standardDeviations: {...standardDeviations, [name]: value}}
}

export const changeColor = hsl => state => async (dispatch, _getState) => {
  dispatch(state => ({...state, base: hsl, imageUrl: null}))
  dispatch(refreshBaseMatrix())
}

export const updateLength = length => state => {
  return refresh()({...state, length})
}

export const updateWidth = width => state => async (dispatch, _getState) => {
  dispatch(state => ({...state, width}))
  dispatch(refreshBaseMatrix())
  dispatch(refresh())
}

export const updateHeight = height => state => async (dispatch, _getState) => {
  dispatch(state => ({...state, height}))
  dispatch(refreshBaseMatrix())
  dispatch(refresh())
}

export const updateBaseMatrix = baseMatrix => state => {
  return {...state, baseMatrix}
}

export const updateImageUrl = imageUrl => state => async (dispatch, _getState) => {
  dispatch(state => ({...state, imageUrl}))
  await dispatch(refreshBaseMatrix())
}
