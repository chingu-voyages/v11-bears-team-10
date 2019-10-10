import React, { Component } from "react";
import { connect } from "react-redux";
import { Tooltip, OverlayTrigger, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import getProjectById from "../../redux/action_creators/getProjectById";
import updateProjectById from "../../redux/action_creators/updateProjectById";

import DarkTransparentContainer from "../../reusable_components/DarkTransparentContainer";
import Description from "./Description";
import Discussion from "./Discussion";
import TodoList from "./todo_list";
import TeamMembers from "./TeamMembers";

const tabs = [
	{
		name: "project description",
		fa_icon: "home"
	},
	{
		name: "todos",
		fa_icon: "tasks"
	},
	{
		name: "discussion",
		fa_icon: "comments"
	},
	{
		name: "team members",
		fa_icon: "users"
	}
];

class ProjectPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTabIndex: 0,
			project: null,
			fetchingProject: true
		};
	}

	componentDidMount() {
		this.props.getProjectById(this.props.match.params.id, this.setProject, this.stopSpinner);
	}

	stopSpinner = () => this.setState({ fetchingProject: false });
	setProject = project =>
		this.setState({
			project,
			fetchingProject: false
		});

	setActiveTabIndex = index => this.setState({ activeTabIndex: index });

	renderContent = () => {
		if (this.state.fetchingProject)
			return (
				<div className="text-center h-100">
					<Spinner
						animation="border"
						variant="primary"
						className="my-5 big-spinner"
						role="status">
						<span className="sr-only">Fetching the project ...</span>
					</Spinner>
				</div>
			);

		if (!this.state.fetchingProject && !this.state.project)
			return (
				<div className="text-muted text-center pt-5">
					faild to get the project from the server
				</div>
			);

		switch (this.state.activeTabIndex) {
			case 0:
				return (
					<Description
						title={this.state.project.title}
						description={this.state.project.description}
					/>
				);

			case 1:
				return (
					<TodoList
						addTodo={this.addTodo}
						removeTodo={this.removeTodo}
						toggleTodoCompleted={this.toggleTodoCompleted}
						updateProjectInDatabase={this.updateProjectInDatabase}
						todos={this.state.project.todos}
						team={this.state.project.team}
					/>
				);

			case 2:
				return <Discussion />;

			case 3:
				return <TeamMembers />;

			default:
				return null;
		}
	};

	addTodo = (todo, callback, error_callback) => {
		var _project = { ...this.state.project, todos: [...this.state.project.todos, todo] };

		this.props.updateProjectById(
			_project,

			updatedProject => {
				this.setProject(updatedProject);
				callback();
			},

			error_callback
		);
	};

	updateProjectInDatabase = (callback, error_callback) => {
		this.props.updateProjectById(
			this.state.project,

			updatedProject => {
				this.setProject(updatedProject);
				callback();
			},

			error_callback
		);
	};

	removeTodo = id =>
		this.setState(({ project }) => ({
			project: { ...project, todos: project.todos.filter(todo => todo._id !== id) }
		}));

	toggleTodoCompleted = id =>
		this.setState(({ project }) => ({
			project: {
				...project,
				todos: project.todos.map(todo =>
					todo._id !== id ? todo : { ...todo, completed: !todo.completed }
				)
			}
		}));

	render() {
		return (
			<DarkTransparentContainer>
				<div className="h-100 bg-transparent d-flex flex-column flex-md-row flex-fill bottom-shadow rounded overflow-hidden">
					<nav id="project-page-navbar" className="d-flex flex-row flex-md-column">
						{tabs.map((tab, index) => {
							return (
								<OverlayTrigger
									key={tab.name}
									overlay={<Tooltip>{tab.name}</Tooltip>}>
									<FontAwesomeIcon
										onClick={this.setActiveTabIndex.bind(this, index)}
										icon={tab.fa_icon}
										className={
											index === this.state.activeTabIndex
												? "active"
												: undefined
										}
									/>
								</OverlayTrigger>
							);
						})}
					</nav>
					<section className="px-3 py-3 bg-white flex-fill">
						{this.renderContent()}
					</section>
				</div>
			</DarkTransparentContainer>
		);
	}
}

export default connect(
	null,
	{ getProjectById, updateProjectById }
)(ProjectPage);
