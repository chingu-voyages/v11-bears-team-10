const express = require('express');
const router = express.Router();

const User = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findUsers(res);
});
router.get('/:id', function(req, res, next) {
  const { id } = req.params;
  User.findUser(id, res);
});

module.exports = router;
