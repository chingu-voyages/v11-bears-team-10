import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import resetError from "./redux/action_creators/resetError";

import LandingPage from "./components/LandingPage";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import ContactUs from "./components/ContactUs";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ErrorPage from "./errors/ErrorPage";
import ErrorToast from "./errors/ErrorToast";

const MainContent = ({ user, error, resetError }) => (
	<>
		<ErrorToast error={error} resetError={resetError} delay={3000} />

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
