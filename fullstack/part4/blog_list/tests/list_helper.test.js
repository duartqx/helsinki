import { test, describe } from "node:test";
import assert from "node:assert";
import listHelper from "../utils/list_helper.js";

test("dummy returns one", () => {
  const blogs = /** @type {import('../models/blog').Blog[]}*/ [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const singleBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one Blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(singleBlog);
    assert.strictEqual(result, 5);
  });
});

describe("favorite blog", () => {
  const blogs = [
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "This isnt the favorite",
      author: "Diego Duarte",
      likes: 1,
    },
    {
      title: "The favorite",
      author: "Diego Duarte",
      likes: 15,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
  ];
  const result = listHelper.favoriteBlog(blogs);
  assert.deepStrictEqual(result, {
    title: "The favorite",
    author: "Diego Duarte",
    likes: 15,
  });
});
