import { test, describe, beforeEach, after } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import listHelper from "../utils/list_helper.js";
import { Blog } from "../models/blog.js";
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
});

after(async () => {
  await Blog.deleteMany({});
  await mongoose.connection.close();
});
