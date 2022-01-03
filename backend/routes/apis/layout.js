const router = require("express").Router();
const layoutController = require("../../controllers/layout.js");
const verifyMiddleware = require('../../middlewares/verify.js')
// GET ALL

// router.get('/layout', layoutController.getLayout);

// router.post('/layout', verifyMiddleware,layoutController.createLayout);

// router.patch('/layout', verifyMiddleware,layoutController.updateLayout);


//////////////////////////////////////////////////////////////

module.exports = router;