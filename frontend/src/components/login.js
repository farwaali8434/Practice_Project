import React, { Component } from "react";
import Form from "./form";
import Joi from "@hapi/joi";
import { Cell, Grid, Row } from "@material/react-layout-grid";
import Card from "@material/react-card";
import { Headline5, Subtitle1, Subtitle2 } from "@material/react-typography";
import { login } from '../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {
  state = {
    user: { username: "", password: "" },
    errors: {}
  };
  Joi = require("@hapi/joi");
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(4)
      .label("Password")
  }

  doSubmit = e => {
    this.props.login(this.state.user.username,this.state.user.password )
  };
  render() {
    if (this.props.isAuthenticated){
      return <Redirect to='/home'/>;
    }
    return (
      <React.Fragment>
        <Grid>
          <Row>
            <Cell desktopColumns={4} tabletColumns={2} />
            <Cell desktopColumns={4} tabletColumns={4}>
              <Card style={{ paddingBottom: "2em" }}>
                <Row>
                  <Cell desktopColumns={1} tabletColumns={1} />
                  <Cell desktopColumns={8} tabletColumns={6}>
                    <Headline5 style={{ marginBottom: "0em" }}>
                      Log in to your account
                    </Headline5>
                  </Cell>
                  <Cell desktopColumns={3} tabletColumns={1} />
                </Row>

                <Row className="inputFields">
                  <Cell desktopColumns={1} tabletColumns={1} />
                  <Cell desktopColumns={10} tabletColumns={6}>
                    {this.renderInput("username", "Username", "text")}
                  </Cell>
                  <Cell desktopColumns={1} tabletColumns={1} />
                </Row>

                <Row className="inputFields" style={{ paddingBottom: "2em" }}>
                  <Cell desktopColumns={1} tabletColumns={1} />
                  <Cell desktopColumns={10} tabletColumns={6}>
                    {this.renderInput("password", "Password", "password")}
                  </Cell>
                  <Cell desktopColumns={1} tabletColumns={1} />
                </Row>
                <Row>
                  <Cell desktopColumns={1} tabletColumns={0} />
                  <Cell desktopColumns={10} tabletColumns={6}>
                    <Cell tabletColumns={6} style={{ textAlign: "right" }}>
                      {this.renderButton("Log In")}
                      
                    </Cell>
                  </Cell>
                  <Cell desktopColumns={3} tabletColumns={1} />
                </Row>
              </Card>
            </Cell>
            <Cell desktopColumns={4} tabletColumns={2} />
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
isAuthenticated:state.auth.isAuthenticated
});
export default connect(mapStateToProps, {login})(LoginForm);
