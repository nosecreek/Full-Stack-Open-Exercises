const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (total, current) => {
    return total + current.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, current) => {
    if(favorite.likes < current.likes) {
      return current
    } else {
      return favorite
    }
  }

  if(blogs.length === 0) { return [] }
  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const reducer = (most, current) => {
    console.log("comparing", most[1], current[1])
    if(most[1] < current[1]) {
      return current
    } else {
      return most
    }
  }

  if(blogs.length === 0) { return {} }
  const author = Object.entries(_.countBy(blogs, 'author')).reduce(reducer)
  return { author: author[0], blogs: author[1] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}