const router = require('express').Router();
const controllers = require('../controllers');
const { isAuth } = require('../config/restrictedPages');

router.get('/', isAuth, controllers.home.get.home);

module.exports = router;