import { test, describe, beforeEach, after } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import listHelper from "../utils/list_helper.js";
import { Blog, updateBlog } from "../models/blog.js";
import { info } from "node:console";

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

  test("get blog by id", async () => {
    const response = await api.get("/api/blogs");

    assert.notStrictEqual(
      response.body,
      undefined,
      "response body should not be undefined",
    );
    assert.notStrictEqual(
      response.body,
      null,
      "response body should not be null",
    );
    assert.notDeepStrictEqual(
      response.body,
      [],
      "response body should not be an empty array",
    );

    const firstBlog = response.body[0];

    assert.notStrictEqual(firstBlog.id, undefined);

    const result = await api
      .get(`/api/blogs/${firstBlog.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    info(result.body);

    assert.deepStrictEqual(firstBlog, result.body);
  });

  test("post blog creates a new entry in the database and likes defaults to 0", async () => {
    const newBlog = {
      title: "Test blog created at the test",
      author: "Diego Duarte",
      url: "blog.duartqx.com",
    };

    const newBlogResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    info("new blog entry", newBlogResponse.body);

    assert.strictEqual(newBlogResponse.body.likes, 0);

    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(
      response.body.length,
      listHelper.initialBlogs.length + 1,
    );

    assert(response.body.map((b) => b.title).includes(newBlog.title));
  });

  test("post blog requires author, title and url", async () => {
    const badBlogs = [
      {
        title: "",
        author: "",
        url: "",
      },
      {
        title: "has title",
        author: "",
        url: "",
      },
      {
        title: "",
        author: "has author",
        url: "",
      },
      {
        title: "",
        author: "",
        url: "has.url.com",
      },
    ];

    for (let badblog of badBlogs) {
      await api.post("/api/blogs").send(badblog).expect(400);
    }

    await api
      .post("/api/blogs")
      .send({
        title: "has title",
        author: "has author",
        url: "has.url.com",
      })
      .expect(201);
  });

  test("blog patch works", async () => {
    const blogs = await api.get("/api/blogs");
    const blog = blogs.body[blogs.body.length - 1];

    blog.likes += 2;
    blog.title += " - Updated";
    blog.author += " - Updated";
    blog.url += " - Updated";

    const updResponse = await api
      .patch(`/api/blogs/${blog.id}`)
      .send(blog)
      .expect(200);

    info("Response Body: ", updResponse.body);

    const updBlog = {
      id: updResponse.body.id,
      title: updResponse.body.title,
      author: updResponse.body.author,
      likes: updResponse.body.likes,
      url: updResponse.body.url,
    };

    info("Update test\n", "Expected:", blog, "\nGot:", updBlog);

    assert.deepStrictEqual(blog, updBlog);
  });

  test("blog deletion works", async () => {
    const startBlogs = await api.get("/api/blogs");
    const blog = startBlogs.body[0];

    await api.delete(`/api/blogs/${blog.id}`).expect(204);

    const endBlogs = await api.get("/api/blogs");

    for (let b of endBlogs.body) {
      assert.notDeepStrictEqual(blog, b);
    }
  });
});

after(async () => {
  await Blog.deleteMany({});
  await mongoose.connection.close();
});
