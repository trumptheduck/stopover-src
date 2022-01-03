const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    content: {type: String, required: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: {type: Number, required: true},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    timestamp: {type: String, required: true},
    thumbnail: {type: String},
    images: [{type: String, required: true}],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    isPublished: { type: Boolean, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    collection: "posts",
  }
);
module.exports = mongoose.model("Post", postSchema);
