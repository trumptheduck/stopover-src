const User = require("../models/user");
const jwt = require("jsonwebtoken");
const accessTokenKey = "this_is_key_for_development";

exports.verifyUser = async (req, res, next) => {
  try {
    const jwtToken = req.headers['authorization'].slice(7);
    if (!jwt||jwtToken===null||jwtToken===undefined) {
      return res.status(403).json({msg: "Access Denied!"})
    }
    const decodedToken = jwt.verify(jwtToken, accessTokenKey);
    if (decodedToken === null) {
        return res.status(403).json({msg: "Access Denied!"})
    }
    User.findOne({ _id: decodedToken?.userId }).exec((err, user) => {
      if (err) {
        console.log(err)
        return res.status(403).json({msg: "Access Denied!"})
      }
      if (user) {
        res.locals.user = user;
        next()
      }
    });
  } catch (err) {
    res.status(500).json({msg: "Internal server error!"})
  }};

  exports.verifyWriter = async (req,res,next) => {
    try {
    if (res.locals.user.isWriter) {
      return next();
    }
    return res.status(403).json({msg: "Access Denied!"})
  } catch (err) {
    return res.status(500).json({msg: err})
  };
  }