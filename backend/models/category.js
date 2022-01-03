const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
    name: {type: String, required: true},
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
  },
  {
    collection: "categories",
  }
)

module.exports = mongoose.model("Category", categorySchema);