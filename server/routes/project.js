const express = require('express');
const router = express.Router();

const Project = require('../controllers/project');


router.get('/user/:userId', function(req, res, next) {
  const { userId } = req.params;
  Project.findUserProjects(userId, res);
});
router.get('/:id', function(req, res, next) {
  const { id } = req.params;
  Project.findProject(id, res);
});

module.exports = router;
