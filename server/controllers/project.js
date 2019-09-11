const Project = require('../models/project');
const User = require('../models/user');

const findUserProjects = async (userId, res) => {
  try {
    const project = await Project.find({ userId });
    if (project.length) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Serveur Error' });
  }
};

const findProject = async (id, res) => {
  try {
    const project = await Project.findById(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const createProject = async (userId, req, res) => {
  const project = req.body;
  try {
    const newProject = await Project.create({
      project_owner: userId,
      ...project
    });
    const savedProject = await newProject.save();
    await User.findByIdAndUpdate(userId, {
      $push: { projectList: savedProject._id }
    });
    res.status(201).json(savedProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const updateProject = async (id, req, res) => {
  const update = req.body;
  try {
    const project = await Project.findByIdAndUpdate(id, update, { new: true });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const deleteProject = async (id, res) => {
  try {
    const project = await Project.findByIdAndDelete(id);
    if (project) {
      const userId = project.project_owner;
      const projectId = project._id;
      await User.findByIdAndUpdate(userId, {
        $pull: { projectList: projectId }
      });
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  findProject,
  findUserProjects,
  createProject,
  updateProject,
  deleteProject
};
