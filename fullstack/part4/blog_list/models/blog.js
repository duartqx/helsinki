import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

const createBlog = async (b) => {
  if (!b.author || !b.title || !b.url) {
    throw new Error("Blogs require an author, a title and an url!");
  }

  const blog = new Blog({
    author: b.author.toString(),
    title: b.title.toString(),
    url: b.url.toString(),
    likes: Number(b.likes) || 0,
  });

  return blog.save();
};

const updateBlog = async (id, blog) => {
  if (!id) {
    throw new Error("Id to update blog is required!");
  }

  if (!blog.author || !blog.title || !blog.url) {
    throw new Error("Blogs require an author, a title and an url!");
  }

  const updBlog = {
    author: blog.author.toString(),
    title: blog.title.toString(),
    url: blog.url.toString(),
    likes: Number(blog.likes) || 0,
  };

  return await Blog.findByIdAndUpdate(id, updBlog, { new: true });
};

export { Blog, createBlog, updateBlog };
