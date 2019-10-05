
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
    const user = await User.findByIdAndUpdate(userId, {
      $push: {
        projectList: { _id: newProject._id, title: newProject.title }
      }
    }, { new: true });
    res.status(201).json({ project: newProject, projectList: user.projectList });
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
    const user = await User.findById(adminId, 'projectList')
    res.status(200).json({ project, projectList: user.projectList});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (id, req, res) => {
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ error: 'Not Found' });

    if (!project.admin.equals(req.user._id))
      return res.status(401).send('UnAuthorized');

    const user = await User.findByIdAndUpdate(project.admin, {
      $pull: { projectList: { _id: project._id } }
		}, {new: true});
		
    res.status(200).json({ project, projectList: user.projectList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateUserProjectList(res, project, users = []) {
  const nb_todos = project.todos.length;
  const nb_msg = project.messages.length;
  const nb_member = project.team.length + 1;
  const completed = project.completed;
  await Promise.all(
    users.map(async userId => {
      try {
        const user = await User.findById(userId,{password:0});
        const userPrj = user.projectList.id(project._id);
        if (userPrj) {
          userPrj.set({ title: project.title, nb_todos, nb_msg, nb_member, completed });
        } else {
          user.projectList.push({
            _id: project._id,
            title: project.title,
            nb_todos,
            nb_msg,
            nb_member,
            completed
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
