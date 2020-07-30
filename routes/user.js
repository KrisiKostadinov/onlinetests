const router = require('express').Router();
const controllers = require('../controllers');

router.post('/register', controllers.user.post.register);
router.post('/login', controllers.user.post.login);

module.exports = router;