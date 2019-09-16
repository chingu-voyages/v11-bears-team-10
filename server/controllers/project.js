const Project = require('../models/project');
const User = require('../models/user');

const findUserProjects = async (userId, res) => {
  try {
    const projects = await Project.find({ admin: userId });
    if (projects.length) {
      res.status(200).json({ projects });
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findProject = async (id, res) => {
  try {
    const project = await Project.findById(id);
    if (project) {
      res.status(200).json({ project });
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProject = async (userId, req, res) => {
  const project = req.body;
  try {
    const newProject = await Project.create({
      admin: userId,
      ...project
    });
    const savedProject = await newProject.save();
    await User.findByIdAndUpdate(userId, {
      $push: {
        projectList: { pr_id: savedProject._id, title: savedProject.title }
      }
    });
    res.status(201).json({ project: savedProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (id, req, res) => {
  const update = req.body;
  try {
    const project = await Project.findByIdAndUpdate(id, update, { new: true });
    if (project) {
      res.status(200).json({ project });
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (id, res) => {
  try {
    const project = await Project.findByIdAndDelete(id);
    if (project) {
      const userId = project.admin;
      const projectId = project._id;
      await User.findByIdAndUpdate(userId, {
        $pull: { projectList: { pr_id: projectId } }
      });
      res.status(200).json({ project });
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  findProject,
  findUserProjects,
  createProject,
  updateProject,
  deleteProject
};
