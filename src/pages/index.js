import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import Store from 'repatch'
import { Provider } from 'react-redux'

import RefreshButton from '../components/RefreshButton'
import Matrix from '../components/Matrix'
import ColorPicker from '../components/ColorPicker'
import Sliders from '../components/Sliders'
import { initialState } from '../reducers'

const store = new Store(initialState)

// TODO Use `<></>` instead of `<div></div>`.
const App = () => (
  <div>
    <div>
      <RefreshButton />
    </div>
    <Matrix />
    <Sliders />
    <ColorPicker />
  </div>
)

const IndexPage = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default IndexPage
