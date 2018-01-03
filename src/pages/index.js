import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import Store from 'repatch'
import { Provider } from 'react-redux'

import RefreshButton from '../components/RefreshButton'
import SaveButton from '../components/SaveButton'
import Matrix from '../components/Matrix'
import ColorPicker from '../components/ColorPicker'
import Sliders from '../components/Sliders'
import { initialState } from '../reducers'

const store = new Store(initialState)

// TODO Use `<></>` instead of `<div></div>`.
const App = () => (
  <div>
    <a href="https://github.com/ryo33/16icon">github.com/ryo33/16icon</a>
    <div>
      <RefreshButton />
    </div>
    <Matrix id="icon" width="256px" height="256px" />
    <div>
      <SaveButton targetId="icon" />
    </div>
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
