import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";

import Description from "./Description";
import Discussion from "./Discussion";
import TodoList from "./TodoList";
import DarkTransparentContainer from "../../reusable_components/DarkTransparentContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
			project: {
				completed: true,
				_id: "5d950fef9670a300176896c5",
				admin: "5d950e509670a300176896c4",
				title: "some random title",
				description:
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
				date_create: "2019-10-02T21:00:31.029Z",
				todos: [
					{
						completed: false,
						date_create: "2019-10-03T22:19:48.356Z",
						assigned_users: [
							{
								_id: "5d9676d1d0a00100174414b5",
								username: "wahywahya"
							},
							{
								_id: "5d9676fad0a00100174414c3",
								username: "yawhsa"
							},
							{
								_id: "5d950e509670a300176896c4",
								username: "wowowo"
							}
						],
						notified_users: [],
						_id: "5d967404d0a0010017441450",
						title: "todo name todo name todo name",
						description: "hahah this is a message"
					},
					{
						completed: true,
						date_create: "2019-10-03T22:21:36.261Z",
						assigned_users: [],
						notified_users: [],
						_id: "5d967470d0a001001744145c",
						date_due: "2019-10-03T22:19:48.356Z",
						title: "do this and you'll get money , a lot of it",
						description: "hahah this is a message"
					},
					{
						completed: false,
						date_create: "2019-10-03T22:21:36.261Z",
						assigned_users: [],
						notified_users: [],
						_id: "5d967470d0a001001744145f",
						date_due: "2019-10-03T22:19:48.356Z",
						title: "some random name",
						description: "hahah this is a message"
					},
					{
						completed: false,
						date_create: "2019-10-03T22:21:36.261Z",
						assigned_users: [],
						notified_users: [],
						_id: "5d967470d0a001001744145k",
						date_due: "2019-10-03T22:19:48.356Z",
						title: "todo name",
						description: "hahah this is a message"
					},
					{
						completed: true,
						date_create: "2019-10-03T22:22:48.432Z",
						assigned_users: [],
						notified_users: [],
						_id: "5d9674b8d0a0010017441469",
						date_due: "2019-10-25T00:00:00.000Z",
						title:
							"this is a message this is a message this is a message this is a messagethis is a mess a messagethis is a message a messagethis",
						description: "hahah this is a message"
					}
				],
				messages: [
					{
						date_create: "2019-10-03T22:09:48.707Z",
						_id: "5d9671acd0a0010017441419"
					},
					{
						date_create: "2019-10-03T22:11:12.727Z",
						_id: "5d967200d0a001001744141a",
						text: ""
					},
					{
						date_create: "2019-10-03T22:11:15.072Z",
						_id: "5d967203d0a001001744141c",
						text: "hahah this is a message"
					},
					{
						date_create: "2019-10-03T22:13:15.657Z",
						_id: "5d96727bd0a001001744141f",
						text: "hahah this is a message"
					},
					{
						date_create: "2019-10-03T22:13:59.467Z",
						_id: "5d9672a7d0a0010017441423",
						text: "hahah this is a message"
					},
					{
						date_create: "2019-10-03T22:15:10.082Z",
						_id: "5d9672eed0a0010017441428",
						text: "hahah this is a message"
					},
					{
						date_create: "2019-10-03T22:15:34.362Z",
						_id: "5d967306d0a001001744142e",
						text: "hahah this is a message"
					}
				],
				team: [],
				__v: 0
			}
		};
	}

	// componentDidMount() {
	// 	window.addEventListener("resize", this.onResize);
	// }

	// componentWillUnmount() {
	// 	window.removeEventListener("resize", this.onResize);
	// }

	// // the maximum breakpoint where the layout with tabs is rendered instead of the one with sections
	// LayoutWithTab_max_breakpoint = 767;

	// isLayoutWithTabs = () => window.innerWidth < this.LayoutWithTab_max_breakpoint + 1;

	// onResize = () => {
	// 	var isLayoutWithTabs = this.isLayoutWithTabs();
	// 	if (isLayoutWithTabs !== this.state.isLayoutWithTabs) this.setState({ isLayoutWithTabs });
	// };

	setActiveTab = ({ target: { id } }) => this.setState({ activeTabIconId: id });

	renderContent = () => {
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

const mapStateToProps = (state, props) => console.log(state, props) || {};

export default connect(mapStateToProps)(ProjectPage);
