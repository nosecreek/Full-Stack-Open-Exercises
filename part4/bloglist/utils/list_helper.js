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

module.exports = {
  dummy, totalLikes, favoriteBlog
}