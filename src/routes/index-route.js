const express = require('express');
const router = express.Router();


router.use('/coffe/user', require('./usuario'));
router.use('/coffe/login', require('./login'));





module.exports = router;