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
  if (!b.author || !b.title) {
    throw new Error("Blogs require an author and a title!");
  }

  const blog = new Blog({
    author: b.author,
    title: b.title,
    url: b.url || "",
    likes: Number(b.likes) || 0,
  });

  return blog.save();
};

export { Blog, createBlog };
