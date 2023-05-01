var express = require('express');
var router = express.Router();
const {checkToken, logout, registerUser, authenticateUser, fetchUser} = require('../controllers/userController')



router.post('/register', registerUser);

router.post('/login', authenticateUser);

module.exports = router;
