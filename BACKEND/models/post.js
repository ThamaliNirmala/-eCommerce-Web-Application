const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  productSKU: String,
  productName: String,
  productDesc: String,
  unit: String,
  unitPrice: Number,
  catagory: String,
  quantity: Number,
  images: []
});

const newPost = mongoose.model("Post", Post);
module.exports = newPost;