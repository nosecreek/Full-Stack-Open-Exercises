import React, {useState} from 'react'
import blogService from '../services/blogs'

const NewBlog = ({blogs, setBlogs}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = await blogService.create({"title": title, "author": author, "url": url})
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>New Blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input type="text" value={title} name="Title" onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input type="text" value={author} name="Author" onChange={({target}) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input type="text" value={url} name="URL" onChange={({target}) => setUrl(target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )  
}

export default NewBlog