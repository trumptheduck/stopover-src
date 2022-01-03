const User = require("../models/user");
const jwt = require("jsonwebtoken");
const accessTokenKey = "this_is_key_for_development";

exports.signup = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      isWriter: false
    });
    user.generatePassword(req.body.password);
    const createdUser = await user.save().then(
      (user) => {
        return res.status(200).json({ msg: user });
      },
      (err) => {
        return res.status(409).json({ msg: "Email đã tồn tại!" });
      }
    );
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: err });
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body.email) return res.status(422).json({ msg: "Hãy nhập Email" });
    if (!req.body.password) return res.status(422).json({ msg: "Hãy điền mật khẩu" });
    const user = await User.findOne({ email: req.body.email }).catch((err) => {
      return res.status(500).json({msg: err});
    });
    if (!user.checkValidPassword(req.body.password)) {
      return res.status(401).json({ msg: "Mật khẩu/Email không đúng" });
    }
    const jwtToken = user.generateJWT();
    return res.status(200).json({
      user: user,
      token: jwtToken,
    });
  } catch (err) {
    return res.status(500).json({msg: "Thông tin đăng nhập không hợp lệ"})
  }
  
};

exports.autoLogin = async (req, res) => {
  try {
    const jwtToken = req.body.token;

    if (!jwt) {
      return res.status(500).json({ msg: "Lỗi hệ thống!" });
    }
  
    const decodedToken = jwt.verify(jwtToken, accessTokenKey);
  
    User.findOne({ _id: decodedToken.userId }).exec((err, user) => {
      if (err) {
        return res.status(401).json({ msg: "Phiên đăng nhập đã hết hạn!" });
      }
      if (user) {
        return res.status(200).json(user);
      }
    });
  } catch (err) {
    return res.status(500).json({msg: "Lỗi hệ thống!"})
  }

};


exports.verifyIdentity = async (req, res, next) => {
  const jwtToken = req.params.token;

  if (!jwt) {
    return res.send("Access Denied!")
  }

  const decodedToken = jwt.decode(jwtToken, accessTokenKey);

  User.findOne({ _id: decodedToken.userId }).exec((err, user) => {
    if (err) {
      return res.send("Access Denied!")
    }
    if (user) {
      next()
    }
  });
};
