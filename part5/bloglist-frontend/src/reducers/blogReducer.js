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

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    let blogToChange = getState().blogs.find((b) => b.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    await blogService.update(id, changedBlog)
    dispatch(updateBlog({ id, changedBlog }))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch, getState) => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id)
      dispatch(setNotification('Blog Deleted'))
      dispatch(setBlogs(getState().blogs.filter((b) => b.id !== blog.id)))
    }
  }
}

export const addComment = (id, comment) => {
  return async (dispatch, getState) => {
    await blogService.addComment(id, comment)
    const blogToChange = getState().blogs.find((b) => b.id === id)
    let changedBlog = { ...blogToChange }
    changedBlog.comments = changedBlog.comments.concat(comment)
    dispatch(updateBlog({ id, changedBlog }))
  }
}

export default blogSlice.reducer
