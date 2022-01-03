const mongoose = require("mongoose");

const layoutSchema = new mongoose.Schema(
  {
    homepage: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    all: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    flashsale: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    weekly: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
  },
  {
    collection: "layouts",
  }
);
module.exports = mongoose.model("Layout", layoutSchema);