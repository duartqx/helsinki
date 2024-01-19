import mongoose from "mongoose";

export const connect = () => {
  mongoose.set("strictQuery", false);

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log("Missing Connection String!");
    process.exit(1);
  }

  mongoose
    .connect(uri)
    .then((_) => {
      console.log("Connected to MongoDB");
    })
    .catch((e) => {
      console.log(e);
    });
};
