const Project = require('../models/project');
const User = require('../models/user');

const findUserProjects = async (userId, res) => {
  try {
    const projects = await Project.find({ admin: userId });
    if (!projects.length) return res.status(404).json({ error: 'Not Found' });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findProject = async (id, res) => {
  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Not Found' });
    res.status(200).json({ project });
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
    if (!project) return res.status(404).json({ error: 'Not Found' });
    const adminId = project.admin;
    const teamIds = project.team.map(user => user._id);
    await updateUserProjectList(res, project, [adminId, ...teamIds]);
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (id, req, res) => {
  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Not Found' });

    if (!project.admin.equals(req.user._id))
      return res.status(401).send('UnAuthorized');

    await User.findByIdAndUpdate(project.admin, {
      $pull: { projectList: { _id: project._id } }
    });
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateUserProjectList(res, project, users = []) {
  await Promise.all(
    users.map(async userId => {
      try {
        const nb_todos = project.todos.length;
        const nb_msg = project.message_board.length;
        const nb_member = project.team.length + 1;
        const user = await User.findById(userId);
        const userPrj = user.projectList.id(project._id);
        if (userPrj) {
          userPrj.set({ nb_todos, nb_msg, nb_member });
        } else {
          user.projectList.push({
            _id: project._id,
            title: project.title,
            nb_todos,
            nb_msg,
            nb_member
          });
        }
        await user.save();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    })
  );
}

module.exports = {
  findProject,
  findUserProjects,
  createProject,
  updateProject,
  deleteProject
};
