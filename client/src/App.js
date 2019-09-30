import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import resetError from "./redux/action_creators/resetError";

import ProtectedRoute from "./reusable_components/ProtectedRoute";

import NavBar from "./navbar";
import LandingPage from "./components/LandingPage";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import ContactUs from "./components/ContactUs";
import Dashboard from "./components/Dashboard";
import ProjectBoard from './components/Projects/ProjectBoard/ProjectBoard'
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ErrorPage from "./errors/ErrorPage";
import ErrorToast from "./errors/ErrorToast";
import Footer from "./components/Footer/Footer";

function App({ user, project, error, resetError }) {
	return (
		<BrowserRouter>
			<ErrorToast error={error} onClose={resetError} delay={3000} />
			<NavBar user={user} />

			<Switch>
				<Route path="/" exact component={LandingPage} />
				<Route path="/features" component={Features} />
				<Route path="/how-it-works" component={HowItWorks} />
				<Route path="/contact-us" component={ContactUs} />
			

        <ProtectedRoute 
					path="/project/:id"
					redirectIf={!user}
					redirectTo="/dashboard"
					component = {ProjectBoard}
				/>
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
			<Footer />
		</BrowserRouter>
	);
}

export default connect(
	({ user, error, project }) => ({ user, error, project }),
	{ resetError }
)(App);
