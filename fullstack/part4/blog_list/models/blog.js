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

export { Blog, createBlog };
