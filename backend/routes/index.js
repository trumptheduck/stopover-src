const router = require('express').Router();


router.use('/api', require('./apis/post.js'));
router.use('/api', require('./apis/category.js'));
router.use('/api', require('./apis/file.js'));
router.use('/api', require('./apis/user.js'));
router.use('/api', require('./apis/layout.js'));

module.exports = router;
