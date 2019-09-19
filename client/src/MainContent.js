import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import { resetError } from "./redux/actionCreators";

import LandingPage from "./components/LandingPage";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import ContactUs from "./components/ContactUs";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ErrorPage from "./errors/ErrorPage";
import { Toast } from "react-bootstrap";
import { getErrorMessage } from "./_helpers";

const MainContent = ({ user, error }) => (
	<>
		<Toast className="p-3 bg-danger text-light" show={!!error}>
			{getErrorMessage(error)}
		</Toast>

		<Switch>
			<Route path="/" exact component={LandingPage} />
			<Route path="/features" component={Features} />
			<Route path="/how-it-works" component={HowItWorks} />
			<Route path="/contact-us" component={ContactUs} />

			<ProtectedRoute
				path="/dashboard"
				redirectIf={!user}
				redirectTo="/login"
				component={Dashboard}
			/>
			<ProtectedRoute
				path="/login"
				redirectIf={user}
				redirectTo="/dashboard"
				component={LoginForm}
			/>
			<ProtectedRoute
				path="/register"
				redirectIf={user}
				redirectTo="/dashboard"
				component={RegisterForm}
			/>

			<Route render={() => <ErrorPage error={{ statusCode: 404 }} />} />
		</Switch>
	</>
);

export default connect(
	({ user, error }) => ({ user, error }),
	{ resetError }
)(MainContent);
