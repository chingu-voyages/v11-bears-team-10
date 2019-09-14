const express = require('express');
const router = express.Router();

const User = require('../controllers/user');

/* GET user */
router.get('/', (req, res) => {
  User.findUsers(res);
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  User.findUserById(id, res);
});
router.get('/username/:username', (req, res) => {
  const { username } = req.params;
  User.findUsersByUsername(username, res)
});
router.get('/email/:email', (req, res) => {
  const { email } = req.params;
  User.findUsersByEmail(email, res)
});


/* PUT user */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  User.UpdateUser(id, req, res);
});

/* DELETE user */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  User.deleteUser(id, req, res);
});

module.exports = router;
