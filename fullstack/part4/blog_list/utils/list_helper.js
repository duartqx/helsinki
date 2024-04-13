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

const mostBlog = (blogs) => {};

export default { dummy, totalLikes, favoriteBlog };
