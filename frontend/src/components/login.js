import React, { Component } from "react";
import Form from "./form";
import Joi from "@hapi/joi";
import { Cell, Grid, Row } from "@material/react-layout-grid";
import Card from "@material/react-card";
import { Headline5, Subtitle1, Subtitle2 } from "@material/react-typography";
import { login } from "./../services/authSerices";
import { Link } from "react-router-dom";

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

  doSubmit = async () => {
    try {
      const { user } = this.state;
      const { data: jwt } = await login(user.username, user.password);
      localStorage.setItem("token", jwt["token"]);
      this.props.uponLogin(jwt)
      this.props.history.push("/home");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.non_field_errors;
        this.setState({ errors });
        console.log(errors)
      }
    }
  };
  render() {
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
export default LoginForm;
