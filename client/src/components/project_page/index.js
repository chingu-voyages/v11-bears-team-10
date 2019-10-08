import React, { Component } from "react";
import { connect } from "react-redux";
import { Tooltip, OverlayTrigger, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import getProjectById from "../../redux/action_creators/getProjectById";

import DarkTransparentContainer from "../../reusable_components/DarkTransparentContainer";
import Description from "./Description";
import Discussion from "./Discussion";
import TodoList from "./todo_list";
import TeamMembers from "./TeamMembers";

const tab_icons = [
	{
		name: "project description",
		id: "project-description-tab-icon",
		fa_icon: "home"
	},
	{
		name: "todos",
		id: "todos-tab-icon",
		fa_icon: "tasks"
	},
	{
		name: "discussion",
		id: "discussion-tab-icon",
		fa_icon: "comments"
	},
	{
		name: "team members",
		id: "team-members-tab-icon",
		fa_icon: "users"
	}
];

class ProjectPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTabIconId: tab_icons[0].id,
			project: null,
			fetchingProject: true
		};
	}

	componentDidMount() {
		this.props.getProjectById(this.props.match.params.id, this.setProject, this.stopSpinner);
	}

	stopSpinner = () => this.setState({ fetchingProject: false });
	setProject = project => this.setState({ project, fetchingProject: false });

	setActiveTab = ({ target: { id } }) => this.setState({ activeTabIconId: id });

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

		switch (this.state.activeTabIconId) {
			case "project-description-tab-icon":
				return (
					<Description
						title={this.state.project.title}
						description={this.state.project.description}
					/>
				);

			case "todos-tab-icon":
				return (
					<TodoList
						addTodo={this.addTodo}
						removeTodo={this.removeTodo}
						toggleTodoCompleted={this.toggleTodoCompleted}
						todos={this.state.project.todos}
					/>
				);

			case "discussion-tab-icon":
				return <Discussion />;

			case "team-members-tab-icon":
				return <TeamMembers />;

			default:
				return null;
		}
	};

	addTodo = todo =>
		this.setState(({ project }) => ({
			project: { ...project, todos: [...project.todos, todo] }
		}));

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
						{tab_icons.map(tab_icon => {
							return (
								<OverlayTrigger
									key={tab_icon.id}
									overlay={<Tooltip>{tab_icon.name}</Tooltip>}>
									<FontAwesomeIcon
										id={tab_icon.id}
										onClick={this.setActiveTab}
										icon={tab_icon.fa_icon}
										className={
											tab_icon.id === this.state.activeTabIconId
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
	{ getProjectById }
)(ProjectPage);
