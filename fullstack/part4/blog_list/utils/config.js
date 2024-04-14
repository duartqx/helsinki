const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? "mongodb://localhost:27017/test_bloglist"
    : "mongodb://localhost:27017/bloglist";

console.log(MONGODB_URI);

const PORT = 3003;

export default { MONGODB_URI, PORT };
