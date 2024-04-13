const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (acc, curr) => {
    const likes = /** @type {number} */ curr?.likes || 0;
    return acc + likes;
  };

  return blogs.length !== 0 ? blogs.reduce(reducer, 0) / blogs.length : 0;
};

const favoriteBlog = (blogs) => {
  const reducer = (fav, curr) => {
    if (fav === null) {
      return curr;
    }
    return (curr?.likes || 0) > (fav?.likes || 0) ? curr : fav;
  };
  return blogs.length !== 0 ? blogs.reduce(reducer, null) : null;
};

const mostBlog = (blogs) => {
  const result = { author: "", blogs: 0 };
  const authorsCounter = /** @type {[key: string]: number} */ {};

  if (blogs.length === 0) {
    return null;
  }

  for (let blog of blogs) {
    const count = (authorsCounter[blog.author] || 0) + 1;
    authorsCounter[blog.author] = count;

    if (count > result.blogs) {
      result.author = blog.author;
      result.blogs = count;
    }
  }

  return result;
};

const mostLikes = (blogs) => {
  const result = { author: "", likes: 0 };
  const likesCounter = /** @type {[key: string]: number} */ {};

  if (blogs.length === 0) {
    return null;
  }

  for (let blog of blogs) {
    const count = (likesCounter[blog.author] || 0) + (blog.likes || 0);
    likesCounter[blog.author] = count;

    if (count > result.likes) {
      result.author = blog.author;
      result.likes = count;
    }
  }

  return result;
};

export default { dummy, totalLikes, favoriteBlog, mostBlog, mostLikes };
