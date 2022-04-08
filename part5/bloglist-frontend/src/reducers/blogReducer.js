import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const id = action.payload.id
      const changedBlog = action.payload.changedBlog
      return state.map((a) => (a.id !== id ? a : changedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { updateBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const b = await blogService.getAll()
    dispatch(setBlogs(b))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const b = await blogService.create(content)
    dispatch(appendBlog(b))
    dispatch(setNotification(`New Blog: ${b.title} by ${b.author}`))
  }
}

export default blogSlice.reducer
