const Project = require('../models/project');

const findUserProjects = async (userId, res) => {
  try {
    const project = await Project.find({ userId });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(400).json({ error: 'Not Found' });
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
    const newProject = await Project.create({ userId, ...project });
    const savedProject = await newProject.save();
    return res.status(201).json(savedProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const UpdateProject = async (id, req, res) => {
  const update = req.body;
  try {
    const project = await Project.findByIdAndUpdate({ id, update });
    if(project){
      res.status(200).json(project)
    }else{
      res.status(404).json({error: 'Not Found'})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server Error'})
  }
};

const deleteProject = async (id, res) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if(user){
      res.status(200).json(user)
    }else{
      res.status(404).json({error: 'Not Found'})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server Error'})
  }
};

module.exports = {
  findProject,
  findUserProjects,
  createProject,
  UpdateProject,
  deleteProject
};
