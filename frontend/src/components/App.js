import "../App.scss";
import "babel-polyfill";
import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./books";
import Home from "./home";
import Logout from "./logout";
import UserForm from "./userForm";
import LoginForm from "./login";
import jwtDecode from "jwt-decode";
import NavBar from "./navBar";

class App extends Component {
  state = { user: null };
  loginHandler = jwt => {
    try {
      
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  };
  componentDidMount() {
    // try {
    const jwt = localStorage.getItem("token");
    this.loginHandler(jwt);
    //   const user = jwtDecode(jwt);
    //   this.setState({ user });
    // } catch (ex) {}
  }
  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route
              exact
              path="/home"
              render={props => <Home {...props} user={this.state.user} />}
            />
            <Route exact path="/books" component={Books} />
            <Route path="/users/:id" component={UserForm} />
            <Route
              exact
              path="/"
              render={props => (
                <LoginForm {...props} uponLogin={this.loginHandler} />
              )}
            />
            <Route path="/logout" component={Logout} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
