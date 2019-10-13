import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import resetError from "./redux/action_creators/resetError";

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
import ProjectPage from "./components/Projects/ProjectBoard/ProjectBoard";
import TodoPage from "./components/Todos/TodoPage";
import ErrorPage from "./errors/ErrorPage";
import ErrorToast from "./errors/ErrorToast";

import Chat from "./components/chat/Chat";
import configSocketIo from "./redux/action_creators/chatAction";

function App({ user, error, resetError, configSocketIo }) {
  useEffect(() => {
    if (user) configSocketIo();
  }, [configSocketIo, user]);
  return (
    <BrowserRouter >
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
          path="/chat"
          redirectIf={!user}
          redirectTo="/login"
          component={Chat}
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
const mapDistpachToProps = dispatch => ({
  configSocketIo: () => dispatch(configSocketIo()),
  resetError
});

export default connect(
  ({ user, error }) => ({ user, error }),
  mapDistpachToProps
)(App);
