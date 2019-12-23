import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material/react-button";
import TablePagination from "@material-ui/core/TablePagination";
import { getUsers, deleteUsers } from "./../services/getUsers";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";

class TableUsers extends Component {
  state = {
    users: [],
    rowsPerPage: 3,
    page: 0,
    searchQuery: ""
  };

  async componentDidMount() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  searchHandle = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDelete = async user => {
    const users = this.state.users.filter(u => u.id !== user.id);
    this.setState({ users });
    await deleteUsers(user.id);
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 });
  };

  render() {
    let { users, rowsPerPage, page, searchQuery } = this.state;
    if (searchQuery)
      users = users.filter(u => {
        let email_search = u.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        let username_search = u.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return username_search || email_search;
      });
  
    return (
      <React.Fragment>
        <TextField
          label="Search.."
          name="searchQuery"
          value={this.state.searchQuery}
          onChange={this.searchHandle}
        ></TextField>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Password</TableCell>
                  <TableCell align="right">Status Read</TableCell>
                  <TableCell align="right">Status Delete</TableCell>
                  <TableCell align="right">Status Update</TableCell>
                  <TableCell align="right">Admin</TableCell>
                  <TableCell align="right"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map(user => {
                    return (
                      <TableRow key={user.id}>
                        <TableCell align="right">
                          <Link to={`/users/${user.id}`}>{user.username}</Link>
                        </TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                        <TableCell align="right">{user.password}</TableCell>
                        <TableCell align="right">
                          {user.read_book === true ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="right">
                          {user.delete_book === true ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="right">
                          {user.update_book === true ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="right">
                          {user.is_staff === true ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => this.handleDelete(user)}
                            variant="contained"
                            color="primary"
                            outlined
                            dense
                            //   disabled={this.validate()}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 6, 9]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </React.Fragment>
    );
  }
}
export default TableUsers;
