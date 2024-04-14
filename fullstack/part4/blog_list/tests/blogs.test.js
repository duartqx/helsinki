import { test, describe, beforeEach, after } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import listHelper from "../utils/list_helper.js";
import { Blog } from "../models/blog.js";

const api = supertest(app);

describe("api integration tests", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(listHelper.initialBlogs);
  });

  test("get returns json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("get has three blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, listHelper.initialBlogs.length);
  });

  test("a specific blog is within the returned", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map((blog) => blog.title);
    assert(titles.includes("Second blog test"));
  });
});

after(async () => {
  await Blog.deleteMany({});
  await mongoose.connection.close();
});
