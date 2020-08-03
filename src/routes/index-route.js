const express = require('express');
const router = express.Router();

router.use('/coffe/user', require('./usuario'));
router.use('/coffe/login', require('./login'));
router.use('/coffe/category', require('./category'));
router.use('/coffe/product', require('./product'));
router.use(require('./upload'));



module.exports = router;