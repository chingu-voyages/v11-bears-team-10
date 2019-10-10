import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import resetToastMessage from "./redux/action_creators/resetToastMessage";

import ProtectedRoute from "./reusable_components/ProtectedRoute";

import NavBar from "./components/navbar";
import LandingPage from "./components/LandingPage";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import ContactUs from "./components/ContactUs";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard";
// import ProjectPage from "./components/Projects/ProjectBoard/ProjectBoard";
import ProjectPage from "./components/project_page";
import TodoPage from "./components/Todos/TodoPage";

import ErrorPage from "./errors/ErrorPage";
import MessageToast from "./reusable_components/MessageToast";

function App({ user, toastMessage, resetToastMessage }) {
	return (
		<BrowserRouter>
			{toastMessage && toastMessage.content && (
				<MessageToast
					content={toastMessage.content}
					error={toastMessage.type === "error"}
					success={toastMessage.type === "success"}
					onClose={resetToastMessage}
					delay={4000}
				/>
			)}

			<NavBar user={user} />

			<Switch>
				<Route path="/" exact component={LandingPage} />
				<Route path="/features" component={Features} />
				<Route path="/how-it-works" component={HowItWorks} />
				<Route path="/contact-us" component={ContactUs} />

				<ProtectedRoute
					path="/project/:id"
					redirectIf={!user}
					redirectTo="/login"
					component={ProjectPage}
				/>
				<ProtectedRoute
					path="/todo/:id"
					redirectIf={!user}
					redirectTo="/login"
					component={TodoPage}
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
	({ user, toastMessage }) => ({ user, toastMessage }),
	{ resetToastMessage }
)(App);
