const Project = require("../models/project");
const User = require("../models/user");

const findUserProjects = async (userId, res) => {
  try {
    const projects = await Project.find({ admin: userId });
    if (!projects.length) return res.status(404).json({ error: "Not Found" });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findProject = async (id, res) => {
  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: "Not Found" });
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProject = async (userId, req, res) => {
  const project = req.body;
  console.log("project =", project);
  try {
    const newProject = await Project.create({
      admin: userId,
      ...project
    });
    await newProject.save();
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          projectList: {
            _id: newProject._id,
            title: newProject.title,
            nb_member: 1
          }
        }
      },
      { new: true }
    );
    res
      .status(201)
      .json({ project: newProject, projectList: user.projectList.reverse() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (id, req, res) => {
  const update = req.body;
  try {
    const { team } = await Project.findById(id, "team");
    const project = await Project.findByIdAndUpdate(id, update, { new: true });
    if (!project) return res.status(404).json({ error: "Not Found" });
    const adminId = project.admin;
    const teamToAddIds = project.team.map(user => user._id);
    const teamToDeleteIds = team
      .filter(
        user =>
          !project.team.find(el => el._id.toString() === user._id.toString())
      )
      .map(user => user._id);
    await updateUserProjectList(
      res,
      project,
      [adminId, ...teamToAddIds],
      teamToDeleteIds
    );
    const user = await User.findById(adminId, "projectList");
    res.status(200).json({ project, projectList: user.projectList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
async function updateUserProjectList(
  res,
  project,
  addPrjToUsers = [],
  deleteProjectUsers
) {
  const nb_todos = project.todos.length;
  const nb_msg = project.messages.length;
  const nb_member = project.team.length ;
  const completed = project.completed;
  await Promise.all(
    addPrjToUsers.map(async userId => {
      try {
        const user = await User.findById(userId, { password: 0 });
        const userPrj = user.projectList.id(project._id);
        if (userPrj) {
          userPrj.set({
            title: project.title,
            nb_todos,
            nb_msg,
            nb_member,
            completed
          });
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
  try {
    await User.updateMany(
      { _id: { $in: deleteProjectUsers } },
      {
        $pull: { projectList: { _id: project._id } }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteProject = async (id, req, res) => {
  console.log("---------delete project--------------");
  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: "Not Found" });

    if (!project.admin.equals(req.user._id))
      return res.status(401).send("UnAuthorized");

    await Project.findByIdAndDelete(id);
    
    const ids = project.team.map(user => user._id);
    await User.updateMany(
      { _id: { $in: ids } },
      {
        $pull: { projectList: { _id: project._id } }
      },
      { new: true }
    );
    const user = await User.findById(project.admin);
    console.log("users delete project =", user);

    res.status(200).json({ project, projectList: user.projectList });
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
