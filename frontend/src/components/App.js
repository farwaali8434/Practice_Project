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
import NotFound from './not-found';
import { Provider, connect } from 'react-redux';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './alerts';
import store from '../store';
import PrivateRoute from './common/PrivateRoute';
import { autoLogin } from './../actions/auth';

const alertOptions = {
  timeout : 3000,
  position : 'top center'
}
class App extends Component {
    
  render() {
    
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Alerts />
              <Switch>
                <Route
                  exact
                  path="/home"
                  render={props => (<Home {...props}  />)}
                />
                <Route exact path="/books" component={Books} />
                <Route path="/users/:id" component={UserForm} />
                <Route
                  exact
                  path="/"
                  render={props => (
                    <LoginForm {...props} />
                  )}
                />
                <Route path="/logout" component={Logout} />
                <Route path="/not-found" component={NotFound} />
              </Switch>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
