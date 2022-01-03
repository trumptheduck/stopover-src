const Category = require("../models/category.js")

exports.getAllCategory = async (req,res) => {
    try {
        var allCategory = await Category.find()
        if (allCategory.length !== 0) {
          allCategory = await Category.find().populate({
            path:"posts",
          })
        }
        return res.status(200).json(allCategory);
        } catch (err) {
        console.log(err);
        return res.status(500).json(err);
        }
}

exports.createCategory = async (req, res) => {
    try {
    let catName = req.body.name;
    const category = new Category({
      name: catName,
      posts: []
    })
    const createdItem = await category.save();
  
    return res.status(200).json(createdItem);
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    }
  };
  
  exports.deleteCategory = async (req, res) => {
    try {
    let catID = req.body.category._id
    await Category.findByIdAndRemove(catID,(err,docs)=>{
      if (err) {
        console.log(err);
      } else {
          console.log(docs)
      }
    })
  
    return res.status(200).json({ msg: "Xoa danh muc thanh cong" });
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    }
  };
  