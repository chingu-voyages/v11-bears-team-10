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
    await newProject.save();
    await User.findByIdAndUpdate(userId, {
      $push: {
        projectList: { _id: newProject._id, title: newProject.title }
      }
    });
    res.status(201).json({ project: newProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateProject = async (id, req, res) => {
  const update = req.body;
  try {
    const project = await Project.findByIdAndUpdate(id, update, { new: true });
    // console.log('project =', project)
    if (project) {
      const adminId = project.admin;
      const teamIds = project.team.map(user => user._id)
      await updateUserProjectList(res, project, [adminId, ...teamIds])
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

async function updateUserProjectList(res, project, users = []) {
  await Promise.all(users.map(async userId => {
    try {
    const nb_todos = project.todos.length;
    const nb_msg = project.message_board.length;
    const nb_member = project.team.length + 1;
    const user = await User.findById(userId);
    const userPrj = user.projectList.id(project._id);
    if(userPrj){
      userPrj.set({ nb_todos, nb_msg, nb_member });
    }else{
      user.projectList.push({_id: project._id, title: project.title, nb_todos, nb_msg, nb_member})
    }
    
    await user.save();
   
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
  }))
}

module.exports = {
  findProject,
  findUserProjects,
  createProject,
  updateProject,
  deleteProject
};
