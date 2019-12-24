import React, { Component } from 'react';
import  Form  from './form';
import { Cell, Grid, Row } from "@material/react-layout-grid";
import Card from "@material/react-card";
import { Headline5, Subtitle1, Subtitle2 } from "@material/react-typography";
import Checkbox from '@material/react-checkbox';
import Joi from "@hapi/joi";
import { getUser, saveUser } from "./../services/getUsers";

class UserForm extends Form {
  state = {
    user: {
      id: "",
      username: "",
      email: "",
      password: "",
      read_book: false,
      update_book: false,
      delete_book: false,
      is_staff:false
    },
    errors: {}
  };
  Joi = require("@hapi/joi");
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .label("Email"),
    password: Joi.string()
      .required()
      .min(4)
      .label("Password"),
    read_book: Joi.boolean().label("Read_book"),
    delete_book: Joi.boolean().label("Delete_book"),
    update_book: Joi.boolean().label("Update_book"),
    is_staff: Joi.boolean().label("Admin"),
    id: Joi.number().allow('').optional()
   
  }
  async componentDidMount() {
    const userId = this.props.match.params.id;
  
    if (userId === "new") return;
    try {
      const { data: user } = await getUser(userId);
    
      // if(!user) return this.props.history.replace('/not-found')
      
      this.setState({ user: this.mapToViewModel(user) });
    
     
    } catch (ex) {
    //   if (ex.response && ex.response.status === 404)
    //     return this.props.history.replace("/not-found");
    // }
  }
}
  checkboxChangeHandler = e => {
    const user = { ...this.state.user, [e.target.name]: e.target.checked };
    this.setState({ user });
  };

  mapToViewModel(user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      read_book: user.read_book,
      delete_book: user.delete_book,
      update_book: user.update_book,
      is_staff:user.is_staff
    };
  }
  doSubmit = async () => {
      try{
        
          await saveUser(this.state.user);
         
          this.props.history.push("/home");
      }
    catch(ex){
        if (ex.response && ex.response.status === 400){
            const errors = {...this.state.errors};
            errors.username = ex.response.data.username;
            this.setState({errors});
        }
    }
  }
 
  
   
  render() {
    return (
      <React.Fragment>
        <Grid>
          <Row>
            <Cell desktopColumns={3} tabletColumns={2} />
            <Cell desktopColumns={6} tabletColumns={4}>
              <Card style={{ paddingBottom: "2em" }}>
                <Row>
                  <Cell desktopColumns={1} tabletColumns={1} />
                  <Cell desktopColumns={8} tabletColumns={4}>
                    <Headline5 style={{ marginBottom: "0em" }}>
                      User Form
                    </Headline5>
                  </Cell>
                </Row>
                <Row className="inputFields">
                  <Cell desktopColumns={1} tabletColumns={0} />
                  <Cell desktopColumns={8} tabletColumns={7}>
                    <Row>
                      <Cell>
                        <Subtitle1>Username</Subtitle1>
                      </Cell>

                      <Cell desktopColumns={6} tabletColumns={4}>
                        <Subtitle2>
                          {this.renderInput("username", "", "text")}
                        </Subtitle2>
                      </Cell>
                    </Row>
                  </Cell>
                  <Cell desktopColumns={3} tabletColumns={1} />
                </Row>
                <Row className="inputFields">
                  <Cell desktopColumns={1} tabletColumns={0} />
                  <Cell desktopColumns={8} tabletColumns={7}>
                    <Row>
                      <Cell>
                        <Subtitle1>Email</Subtitle1>
                      </Cell>

                      <Cell columns={6}>
                        <Subtitle2>
                          {this.renderInput("email", "", "text")}
                        </Subtitle2>
                      </Cell>
                    </Row>
                  </Cell>
                  <Cell desktopColumns={3} tabletColumns={1} />
                </Row>
                <Row className="inputFields">
                  <Cell desktopColumns={1} tabletColumns={0} />
                  <Cell desktopColumns={8} tabletColumns={7}>
                    <Row>
                      <Cell>
                        <Subtitle1>Password</Subtitle1>
                      </Cell>

                      <Cell desktopColumns={6} tabletColumns={4}>
                        <Subtitle2>
                          {this.renderInput("password", "", "password")}
                        </Subtitle2>
                      </Cell>
                    </Row>
                  </Cell>
                  <Cell desktopColumns={3} tabletColumns={1} />
                </Row>
                <Row className="inputFields">
                  <Cell desktopColumns={1} tabletColumns={0} />
                  <Cell desktopColumns={10} tabletColumns={7}>
                    <Row>
                      <Cell order={1}>
                        <Checkbox
                          name="read_book"
                          nativeControlId="read_book"
                          checked={this.state.user.read_book}
                          onChange={this.checkboxChangeHandler}
                        />
                        <label htmlFor="read_book">Read Status</label>
                      </Cell>
                      <Cell order={2}>
                        <Checkbox
                          name="update_book"
                          nativeControlId="update_book"
                          checked={this.state.user.update_book}
                        
                          onChange={this.checkboxChangeHandler}
                        />
                        <label htmlFor="update_book">Update Status</label>
                      </Cell>
                      <Cell order={3}>
                        <Checkbox
                          name="delete_book"
                          nativeControlId="delete_book"
                          checked={this.state.user.delete_book}
                          onChange={this.checkboxChangeHandler}
                        />
                        <label htmlFor="delete_book">Delete Status</label>
                      </Cell>
                      <Cell order={4}>
                        <Checkbox
                          name="is_staff"
                          nativeControlId="is_staff"
                          checked={this.state.user.is_staff}
                          // indeterminate={
                          //   this.state.user.update_book.indeterminate
                          // }
                          onChange={this.checkboxChangeHandler}
                        />
                        <label htmlFor="is_staff">Admin</label>
                      </Cell>
                    </Row>
                  </Cell>
                  <Cell desktopColumns={3} tabletColumns={1} />
                </Row>
                <Row>
                  <Cell desktopColumns={1} tabletColumns={0} />
                  <Cell desktopColumns={8} tabletColumns={7}>
                    <Cell tabletColumns={6} style={{ textAlign: "right" }}>
                      {this.renderButton("Save")}
                    </Cell>
                  </Cell>
                  <Cell desktopColumns={3} tabletColumns={1} />
                </Row>
              </Card>
            </Cell>
            <Cell desktopColumns={3} tabletColumns={1} />
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}
    
 
export default UserForm;