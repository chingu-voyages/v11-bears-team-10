const express = require('express');
const router = express.Router();

const Project = require('../controllers/project');

/* GET project */
router.get('/user/:userId', function(req, res, next) {
  const { userId } = req.params;
  Project.findUserProjects(userId, res);
});
router.get('/:id', function(req, res, next) {
  const { id } = req.params;
  Project.findProject(id, res);
});

/* POST project */
router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  Project.createProject(userId, req, res);
});

/* PUT project */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  Project.updateProject(id, req, res);
});

/* DELETE project */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Project.deleteProject(id, req, res);
});

module.exports = router;
