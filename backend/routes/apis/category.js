const router = require("express").Router();
const categoryController = require("../../controllers/category.js");
const verifyMiddleware = require('../../middlewares/verify.js')
// GET ALL CAT

// router.get('/categories', categoryController.getAllCategory);

// // CREATE CAT

// router.post("/category", verifyMiddleware,categoryController.createCategory);

// // REMOVE CAT

// router.post("/category/remove", verifyMiddleware,categoryController.deleteCategory);

// //////////////////////////////////////////////////////////////

module.exports = router;