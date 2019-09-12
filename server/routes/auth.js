const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const User = require('../controllers/user')

router.post('/login', (req, res) => {
  auth(req, res);
});


router.post('/register', (req, res) => {
  User.createUser(req, res);
});

module.exports = router;