import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import Store, { thunk } from 'repatch'
import { Provider } from 'react-redux'
import ReduxQuerySync from 'redux-query-sync'
import isBrowser from 'is-browser'
import base64url from 'base64-url'

import ImageInput from '../components/ImageInput'
import RefreshButton from '../components/RefreshButton'
import NumericInputs from '../components/NumericInputs'
import Icons from '../components/Icons'
import ColorPicker from '../components/ColorPicker'
import Sliders from '../components/Sliders'
import {
  refresh,
  initialState,
  updateLength,
  updateWidth,
  updateHeight,
  changeColor,
  updateStandardDeviation,
  updateImageUrl
} from '../reducers'

const store = new Store(initialState)
store.addMiddleware(thunk)
const defaultState = store.getState()
if (isBrowser) {
  const stringToValue = string => {
    if (string) return JSON.parse(base64url.decode(string))
  }
  const valueToString = value => {
    return base64url.encode(JSON.stringify(value))
  }
  ReduxQuerySync({
    store,
    params: {
      length: {
        selector: state => state.length,
        action: updateLength,
        defaultValue: defaultState.length,
        stringToValue, valueToString
      },
      width: {
        selector: state => state.width,
        action: updateWidth,
        defaultValue: defaultState.width,
        stringToValue, valueToString
      },
      height: {
        selector: state => state.height,
        action: updateHeight,
        defaultValue: defaultState.height,
        stringToValue, valueToString
      },
      base: {
        selector: state => state.base,
        action: changeColor,
        defaultValue: defaultState.base,
        stringToValue, valueToString
      },
      hue: {
        selector: state => state.standardDeviations.h,
        action: value => updateStandardDeviation('h', value),
        defaultValue: defaultState.standardDeviations.h,
        stringToValue, valueToString
      },
      satuation: {
        selector: state => state.standardDeviations.s,
        action: value => updateStandardDeviation('s', value),
        defaultValue: defaultState.standardDeviations.s,
        stringToValue, valueToString
      },
      lightness: {
        selector: state => state.standardDeviations.l,
        action: value => updateStandardDeviation('l', value),
        defaultValue: defaultState.standardDeviations.l,
        stringToValue, valueToString
      },
      imageUrl: {
        selector: state => state.imageUrl,
        action: updateImageUrl,
        defaultValue: defaultState.imageUrl,
        stringToValue, valueToString
      },
    },
    initialTruth: 'location',
  })
  store.dispatch(refresh())
}

// TODO Use `<></>` instead of `<div></div>`.
const App = () => (
  <div>
    <a href="https://github.com/ryo33/16icon">github.com/ryo33/16icon</a>
    <div style={{width: '300px'}}>
      <NumericInputs />
      <Sliders />
      <ImageInput />
      <RefreshButton />
    </div>
    <Icons previewSizeBase={32} pngSizeBase={64} />
    <ColorPicker />
  </div>
)

const IndexPage = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default IndexPage
