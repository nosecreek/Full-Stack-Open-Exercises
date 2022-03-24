import { configureStore } from '@reduxjs/toolkit'

import AnecdoteReducer from './reducers/anecdoteReducer'
import NotificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: AnecdoteReducer,
    notification: NotificationReducer
  }
})

export default store

