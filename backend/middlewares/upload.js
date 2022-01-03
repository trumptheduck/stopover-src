const multer = require("multer")
const filepath = "../resources/images";
const util = require("util");
const path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/${filepath}`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} không hợp lệ! Chỉ chấp nhận file đuôi .png hoặc .jpeg.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-image${path.extname(file.originalname)}`;
    callback(null, filename);
  }
});

var uploadFile = multer({ storage: storage }).array('upload',50);
var uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;