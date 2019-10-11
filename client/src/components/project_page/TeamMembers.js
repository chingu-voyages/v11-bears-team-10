import React, { Component } from "react";
import { Spinner, Row, Col, ListGroupItem, Button, Badge } from "react-bootstrap";
import { connect } from "react-redux";

import UserSuggestionsFormGroup from "../../reusable_components/UserSuggestionsFormGroup";
import getAllUsers from "../../redux/action_creators/getAllUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TeamMembers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fetchingAllUsersList: !this.props.allUsersList,
			updatingProject: false
		};
	}

	// a flag to avoid a memory leak cause by setting state after the component is unmounted
	unmounted = false;

	componentDidMount() {
		if (this.state.fetchingAllUsersList)
			this.props.getAllUsers(
				allUsersList =>
					this.unmounted ||
					this.setState({ fetchingAllUsersList: false }, () =>
						this.props.setAllUsersList(allUsersList)
					),

				() => this.unmounted || this.setState({ fetchingAllUsersList: false })
			);
	}

	componentWillUnmount() {
		this.unmounted = true;
	}

	stopSaveButtonSpinner = () => this.setState({ updatingProject: false });

	saveProject = () =>
		this.setState(
			{ updatingProject: true },
			this.props.updateProjectInDatabase(
				this.stopSaveButtonSpinner,
				this.stopSaveButtonSpinner
			)
		);

	render() {
		return (
			<>
				<Row noGutters>
					<h1 className="section-title text-center my-auto mr-auto">Todo list</h1>
					<Button variant="success" className="mr-2" onClick={this.saveProject}>
						{this.state.updatingProject ? (
							<Spinner
								className="mx-2"
								as="span"
								aria-hidden="true"
								animation="border"
								role="status"
								size="sm">
								<span className="sr-only">Updating project ...</span>
							</Spinner>
						) : (
							<>
								<FontAwesomeIcon icon="save" className="mr-2" />
								save
							</>
						)}
					</Button>
				</Row>
				<hr className="w-100" />
				<Row noGutters>
					<Col xs={12} sm={8} md={5} className="mx-auto">
						<UserSuggestionsFormGroup
							controlId="team-members-search-bar"
							label={
								<>
									search for team members
									{this.state.fetchingAllUsersList && (
										<Spinner
											variant="primary"
											className="mx-2"
											as="span"
											aria-hidden="true"
											animation="border"
											role="status"
											size="sm">
											<span className="sr-only">Fetching all users ...</span>
										</Spinner>
									)}
								</>
							}
							comment={this.state.fetchingAllUsersList && "getting all the users"}
							labelClassName="w-100 text-center"
							placeholder="type a name"
							usersToPickFrom={
								this.props.allUsersList
									? this.props.allUsersList.filter(user =>
											this.props.team.every(
												teamMember => teamMember.username !== user.username
											)
									  )
									: []
							}
							admin_id={this.props.admin_id}
							onSuggestionSelect={this.props.addTeamMember}
						/>
					</Col>
				</Row>
				{this.props.team.length > 0 && (
					<Row
						as="ul"
						noGutters
						className={"p-0" + (this.state.fetchingAllUsersList ? "" : " mt-4")}>
						{this.props.team.map(teamMember => (
							<ListGroupItem
								as="li"
								key={"team-member-name-" + teamMember.username}
								className="mr-2 mb-2">
								{teamMember.username}

								{this.props.admin_id !== teamMember._id ? (
									<FontAwesomeIcon
										icon="times"
										className="times-red-circle ml-2 my-auto"
										onClick={this.props.removeTeamMember.bind(this, teamMember)}
									/>
								) : (
									<Badge variant="info" className="ml-2">
										admin
									</Badge>
								)}
							</ListGroupItem>
						))}
					</Row>
				)}
			</>
		);
	}
}

export default connect(
	null,
	{ getAllUsers }
)(TeamMembers);
