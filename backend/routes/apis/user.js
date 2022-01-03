const router = require("express").Router();
const userController = require("../../controllers/user.js");
const verifyMiddleware = require('../../middlewares/verify.js')
// GET ALL

router.post('/user/login', userController.login);

router.post('/user/register', userController.signup);

router.post('/user/autologin', userController.autoLogin);


//////////////////////////////////////////////////////////////

module.exports = router;