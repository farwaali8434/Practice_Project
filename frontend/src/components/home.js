import React, { Component } from "react";
import TableUsers from "./usersTable";
import NavBar from "./navBar";
import Books from './books';

class Home extends Component {
  render() {
    const {user} = this.props;
    return (
      <React.Fragment>
    
        <NavBar user={user}/>
        {user.is_staff &&
        <TableUsers />
        }
        <Books user={user}/>
      </React.Fragment>
    );
    
  }
}

export default Home;
