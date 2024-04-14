import { Router } from "express";
import { Blog } from "../models/blog.js";

const blogRouter = Router();

blogRouter.get("/", async (_, response) => {
  response.json(await Blog.find({})).end();
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog?.id) {
    return response.status(200).json(blog).end();
  }
  response.status(404).end();
});

blogRouter.post("/", async (request, response) => {
  const blog = await new Blog(request.body).save();
  response.status(201).json(blog).end();
});

export default blogRouter;
