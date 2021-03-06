import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeout

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { updateNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return dispatch => {
    dispatch(updateNotification(notification))
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)
  }
}

export default notificationSlice.reducer