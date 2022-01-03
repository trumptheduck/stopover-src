const Post = require("../models/post.js")
const fileController = require("../controllers/file")

function subtractArray(arr1, arr2) {
  var result = [];
  for (let i = 0; i < arr1.length; i ++) {
    var isDifferent = true;
    for (let j = 0; j < arr2.length; j ++) {
      if (arr1[i] === arr2[j]) {
        isDifferent = false;
        break;
      }
    }
    if (isDifferent) result.push(arr1[i]);
  }
  return result;
}


exports.getPosts = async (req, res) => {
    try {
      const posts = await Post.find({isPublished: true});
      return res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  exports.getMyPosts = async (req, res) => {
    try {
      const posts = await Post.find({author: res.locals.user._id});
      return res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };
exports.getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.createPost = async (req, res) => {
    try {
        const post = new Post({
          title: req.body.title,
          subtitle: req.body.subtitle,
          content: req.body.content,
          likes: [],
          views: 0,
          comments: [],
          timestamp: req.body.timestamp,
          thumbnail: req.body.thumbnail,
          images: req.body.images,
          category: req.body.category,
          isPublished: req.body.isPublished,
          author: res.locals.user._id
        });
  
      const createdPost = await post.save();
      console.log("Created new post:", createdPost._id);
      return res.status(200).json(createdPost);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

exports.editPost = async (req, res) => {
    try {
      var targetPost = await Post.findById(req.body._id)
      if (!(String(targetPost.author) === String(res.locals.user._id))) {
        return res.status(403).json("Access Denied!");
      }
      const postData = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        timestamp: req.body.timestamp,
        thumbnail: req.body.thumbnail,
        images: req.body.images,
        category: req.body.category,
        isPublished: req.body.isPublished
      };  

      const post = await Post.findByIdAndUpdate(targetPost._id,postData)
      const updatedPost = await Post.findById(post._id);
      var deleteArray = [...subtractArray(targetPost.images,updatedPost.images)];
      if (targetPost.thumbnail !== updatedPost.thumbnail&&targetPost.thumbnail !== undefined&&targetPost.thumbnail !== "") {
        deleteArray = [...deleteArray, targetPost.thumbnail.split("/")[targetPost.thumbnail.split("/").length-1]];
      }
      fileController.deleteFiles(deleteArray,()=>{
        console.log("Edited post:", updatedPost._id);
        return res.status(200).json(updatedPost);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
};

exports.removePost = async (req, res) => {
    try {
      var targetPost = await Post.findById(req.body._id);
      if (!(String(targetPost.author) === String(res.locals.user._id))) {
        return res.status(403).json("Access Denied!");
      }
      var removedPost = await Post.findByIdAndRemove(targetPost._id);
      if (removedPost) {
        var deleteArray = [];
        if (removedPost.thumbnail !== undefined&&removedPost.thumbnail !== "") {
          deleteArray = [...deleteArray, removedPost.thumbnail.split("/")[removedPost.thumbnail.split("/").length-1]]
        }
        if (Array.isArray(removedPost.images)&&removedPost.images.length > 0) {
          deleteArray = deleteArray.concat(removedPost.images);
        }
        fileController.deleteFiles(deleteArray,()=>{
          console.log("Deleted post:", removedPost._id);
          return res.status(200).json(removedPost);
        });
      } else {
        return res.status(404).json({msg: "Not found"});
      }
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    }
};

exports.likePost = async (req, res) => {
  try {
    let id = req.body._id;
    var post = await Post.findByIdAndUpdate(id, { $addToSet : {likes : res.locals.user._id } });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
}

exports.unlikePost = async (req, res) => {
  try {
    let id = req.body._id;
    var post = await Post.findByIdAndUpdate(id, { $pull : {likes : res.locals.user._id } });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
}