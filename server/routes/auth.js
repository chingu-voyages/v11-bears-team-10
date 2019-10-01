const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const User = require('../controllers/user')

const { body, validationResult } = require('express-validator');

router.post('/v1/login',[
  body('username').isLength({ min: 4 }).matches(/^[a-z]/i),
  body('password')
    .isLength({ min: 8 })
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/\d/)
    .matches(/[^a-z\d]/i)
    .not()
    .matches(/\s/)    
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  auth(req, res);
});


router.post('/v1/register', [
  body('email').isEmail(),
  body('username').isLength({ min: 4 }).matches(/^[a-z]/i),
  body('password')
    .isLength({ min: 8 })
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/\d/)
    .matches(/[^a-z\d]/i)
    .not()
    .matches(/\s/)    
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.createUser(req, res);
});

module.exports = router;