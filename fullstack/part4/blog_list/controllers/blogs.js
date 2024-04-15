import { Router } from "express";
import { Blog, createBlog, updateBlog } from "../models/blog.js";

const blogRouter = Router();

blogRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs).end();
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog?.id) {
    return response.status(200).json(blog).end();
  }
  return response.status(404).end();
});

blogRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id);
  if (blog !== null) {
    return response.status(204).end();
  }
  return response.status(404).end();
});

blogRouter.patch("/:id", async (request, response) => {
  try {
    const blog = await updateBlog(request.params.id, request.body);
    return response.status(200).json(blog).end();
  } catch (e) {
    return response.status(400).send(e.message).end();
  }
});

blogRouter.post("/", async (request, response) => {
  try {
    const blog = await createBlog(request.body);
    return response.status(201).json(blog).end();
  } catch (e) {
    return response.status(400).send(e.message).end();
  }
});

export default blogRouter;
