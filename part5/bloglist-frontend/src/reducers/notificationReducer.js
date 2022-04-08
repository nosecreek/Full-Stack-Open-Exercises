import { createSlice } from '@reduxjs/toolkit'

const initialState = ['', false]
let timeout

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
      return [action.payload, false]
    },
    clearNotification() {
      return initialState
    },
    updateError(state, action) {
      return [action.payload, true]
    }
  }
})

export const { updateNotification, clearNotification, updateError } =
  notificationSlice.actions

export const setNotification = (notification, time = 5) => {
  return (dispatch) => {
    dispatch(updateNotification(notification))
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export const setError = (notification, time = 5) => {
  return (dispatch) => {
    dispatch(updateError(notification))
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
