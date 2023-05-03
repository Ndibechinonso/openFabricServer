var express = require('express');
var router = express.Router();
const {logout, registerUser, authenticateUser, fetchUser} = require('../controllers/userController')
const withAuth = require('../middlewares/routeAuth');

router.post('/register', registerUser);

router.post('/login', authenticateUser);

router.get('/logout', withAuth, logout);

module.exports = router;
