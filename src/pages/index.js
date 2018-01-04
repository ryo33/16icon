import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import Store from 'repatch'
import { Provider } from 'react-redux'

import RefreshButton from '../components/RefreshButton'
import NumericInputs from '../components/NumericInputs'
import Icons from '../components/Icons'
import ColorPicker from '../components/ColorPicker'
import Sliders from '../components/Sliders'
import { initialState } from '../reducers'

const store = new Store(initialState)

// TODO Use `<></>` instead of `<div></div>`.
const App = () => (
  <div>
    <a href="https://github.com/ryo33/16icon">github.com/ryo33/16icon</a>
    <div style={{width: '300px'}}>
      <NumericInputs />
      <Sliders />
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
