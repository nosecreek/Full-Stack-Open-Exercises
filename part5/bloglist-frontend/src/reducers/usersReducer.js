import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const u = await usersService.getAll()
    dispatch(setUsers(u))
  }
}

export default usersSlice.reducer
