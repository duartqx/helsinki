import { Router } from "express";
import { Blog, createBlog } from "../models/blog.js";

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

blogRouter.post("/", async (request, response) => {
  try {
    const blog = await createBlog(request.body);
    return response.status(201).json(blog).end();
  } catch (e) {
    return response.status(400).send(e.message).end();
  }
});

export default blogRouter;
