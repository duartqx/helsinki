import { Router } from "express";
import { Blog } from "../models/blog.js";

const blogRouter = Router();

blogRouter.get("/", async (_, response) => {
  response.json(await Blog.find({}));
});

blogRouter.post("/", async (request, response) => {
  const blog = await new Blog(request.body).save();
  response.status(201).json(blog);
});

export default blogRouter;
