import { configureStore } from '@reduxjs/toolkit'

import AnecdoteReducer from './reducers/anecdoteReducer'
import NotificationReducer from './reducers/notificationReducer'
import FilterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: AnecdoteReducer,
    notification: NotificationReducer,
    filter: FilterReducer
  }
})

export default store

