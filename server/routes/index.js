var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chingu Voyage v11-bear-team-10 Server' });
});

module.exports = router;
