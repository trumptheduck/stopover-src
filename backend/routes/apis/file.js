const fileController = require("../../controllers/file.js");
const { verifyUser, verifyWriter } = require("../../middlewares/verify.js");
const router = require("express").Router();
// const verifyMiddleware = require('../../middlewares/verify.js')

router.post('/image/upload',verifyUser, verifyWriter, fileController.handleFileUpload)

// router.get('/files',verifyMiddleware, fileController.getAllFilePath)

// router.post('/deletefiles',verifyMiddleware, fileController.deleteFiles)

module.exports = router;
