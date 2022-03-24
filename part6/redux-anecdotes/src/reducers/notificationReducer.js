import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificatoin(state, action) {
      return action.payload
    }
  }
})

export const { setNotificatoin } = notificationSlice.actions
export default notificationSlice.reducer