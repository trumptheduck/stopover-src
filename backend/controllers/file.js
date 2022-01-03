const fs = require("fs");
const filepath = "./resources/images";
const upload = require("../middlewares/upload.js")

exports.handleFileUpload = async (req, res) => {
    try {
      await upload(req, res);
  
      if (req.files.length <= 0) {
        return res.status(200).json({data: []})
      }
      req.files.map(file => file.filename).forEach(file => {
        console.log("Uploaded: ",file)
      })
      return res.status(200).json({data:req.files.map(file => file.filename)});
    } catch (error) {
      console.log(error);
  
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(500).json({msg:"Quá nhiều files để upload!"});
      }
      return res.status(500).json({msg:`Xảy ra lỗi khi đang tải lên nhiều files: ${error}`});
    }
  };

exports.getAllFilePath = (req,res) => {
    fs.readdir(filepath, (err, files) => {
        console.log(files)
        res.send(JSON.stringify({files:files}))
    });
}
exports.deleteFiles = (files, callback) => {
    var deleteList = files;
    var deleted = 0;
    if (deleteList.length <= 0) callback();
    deleteList.forEach(image => {
        fs.unlink(filepath + "/" + image, (err) => {
            deleted++
            if (err) {
              console.error(err)
            } else {
              console.log("Removed: ",image)
            }
            if (deleted === deleteList.length) {
                callback();
            }
          })
    })
}