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
    <NumericInputs />
    <Sliders />
    <div>
      <RefreshButton />
    </div>
    <Icons width="128" height="128" />
    <ColorPicker />
  </div>
)

const IndexPage = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default IndexPage
