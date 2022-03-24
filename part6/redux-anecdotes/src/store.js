import { configureStore } from '@reduxjs/toolkit'

import AnecdoteReducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdotes: AnecdoteReducer
  }
})

export default store

