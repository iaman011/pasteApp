// use the docs for code : https://redux-toolkit.js.org/tutorials/quick-start

import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlices.js'

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
})