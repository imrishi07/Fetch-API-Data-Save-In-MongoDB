import fetch from "node-fetch";
import mongoose from "mongoose";

const mongodb_Url = "mongodb://127.0.0.1:27017/APIData";
mongoose.set("strictQuery", false);
mongoose
  .connect(mongodb_Url)
  .then(() => console.log("Connected sucessfull!!!"))
  .catch((err) => console.log(err));

const postSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },

  id: {
    type: Number,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

const getPosts = async () => {
  const post = await fetch("https://jsonplaceholder.typicode.com/posts");
  const response = await post.json();
  response.forEach((element) => {
    const post = new Post({
      userId: element["userId"],
      id: element["id"],
      title: element["title"],
      body: element["body"],
    });
    post.save();
  });
};


//getPosts();
