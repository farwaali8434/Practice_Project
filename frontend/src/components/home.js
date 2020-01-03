import React, { Component } from "react";
import TableUsers from "./users";
import NavBar from "./navBar";
import Books from "./books";
import { autoLogin } from "./../actions/auth";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      this.props.autoLogin(jwt);
    }
  }
  render() {
    let { user } = this.props;
    if (!user) return "";
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
const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, { autoLogin })(Home);
