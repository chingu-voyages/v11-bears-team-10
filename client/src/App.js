import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import LoginForm from "./LoginForm";
import NavBar from "./navbar/NavBar";
import RegisterForm from "./RegisterForm";
import HomePage from "./HomePage";
import DashBoard from "./DashBoard";

import { setUser, setError } from "./redux/actionCreators";
import ErrorInfo from "./ErrorInfo";

class App extends React.Component {
  onLogin = (data, invalidate) =>
    setTimeout(() => {
      // do something with data
      console.log(data);

      // show the error in the login form
      //
      // invalidate("invalid credentials");

      // login the user and redirect to the dashboard
      // this.props.setUser({ name: "john doe" });
      // this.props.history.replace("/dashboard");

      // show an error in the main section
      this.props.setError("internal server error", 500);
    }, 1000);

  onRegister = (data, invalidate) =>
    setTimeout(() => {
      // do something with data
      console.log(data);

      // show errors in the register form
      //
      // invalidate({
      // 	name: "name is required",
      // 	email: "invalid email",
      // 	password: "invalid password",
      // 	password_confirmation: "password doesn't match"
      // });

      // login the user and redirect to the dashboard
      this.props.setUser({ name: "john doe" });
      this.props.history.replace("/dashboard");
    }, 1000);

  componentDidUpdate(prevProps) {
    if (this.props.error && prevProps.error) this.props.setError(null);
  }

  render() {
    return (
      <>
        <NavBar />
        <Container as="main">
          {this.props.error ? (
            <ErrorInfo
              message={this.props.error.message}
              statusCode={this.props.error.statusCode}
            />
          ) : (
            <Switch>
              <Route exact path="/" component={HomePage} />

              <Route
                path="/dashboard"
                render={props =>
                  this.props.user ? (
                    <DashBoard {...props} user={this.props.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />

              <Route
                path="/login"
                render={props =>
                  this.props.user ? (
                    <Redirect to="/" />
                  ) : (
                    <LoginForm
                      {...props}
                      className="w-md-50 my-4 mx-auto"
                      onSubmit={this.onLogin}
                    />
                  )
                }
              />

              <Route
                path="/register"
                render={props =>
                  this.props.user ? (
                    <Redirect to="/" />
                  ) : (
                    <RegisterForm
                      {...props}
                      className="w-md-50 my-4 mx-auto"
                      onSubmit={this.onRegister}
                      user={this.props.user}
                    />
                  )
                }
              />
            </Switch>
          )}
        </Container>
      </>
    );
  }
}

export default withRouter(
  connect(
    ({ user, error }) => ({ user, error }),
    { setUser, setError }
  )(App)
);


//force format
