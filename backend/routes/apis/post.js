const router = require("express").Router();
const itemController = require("../../controllers/post.js");
const verifyMiddleware = require('../../middlewares/verify.js')
// GET ALL

router.get('/posts', itemController.getPosts);

router.get('/myposts', verifyMiddleware.verifyUser, verifyMiddleware.verifyWriter, itemController.getMyPosts);

//GET BY ID

router.get("/post/:id", itemController.getPostById);

// CREATE

router.post("/post", verifyMiddleware.verifyUser, verifyMiddleware.verifyWriter, itemController.createPost);

// EDIT

router.patch("/post",verifyMiddleware.verifyUser, verifyMiddleware.verifyWriter, itemController.editPost);

// REMOVE

router.post("/post/remove",verifyMiddleware.verifyUser, verifyMiddleware.verifyWriter, itemController.removePost);

// LIKE

router.post("/post/like",verifyMiddleware.verifyUser, itemController.likePost);

// UNLIKE

router.post("/post/unlike",verifyMiddleware.verifyUser, itemController.unlikePost);


//////////////////////////////////////////////////////////////

module.exports = router;