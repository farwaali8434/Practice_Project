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
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers, deleteUser, changePage, changeRows , searchHandler} from "./../actions/users";

 export class TableUsers extends Component {
          static propTypes = {
            users: PropTypes.array.isRequired,
            getUsers: PropTypes.func.isRequired,
            deleteUser: PropTypes.func.isRequired
          };

          componentDidMount() {
            this.props.getUsers();
          }
          searchHandle = e => {
            this.props.searchHandler(e.target.value);
            // this.setState({ [e.target.name]: e.target.value });
          };

          handleDelete = async user => {
          };

          handleChangePage = (event, newPage) => {
            this.props.changePage(newPage );
          };

          handleChangeRowsPerPage = event => {
            this.props.changeRows(event.target.value, 0);
          };

          render() {
            // let {users} = this.props;
            // let { users, rowsPerPage, page, searchQuery } = this.state;
            let { users, searchQuery, page, rowsPerPage } = this.props;
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
                  value={this.props.searchQuery}
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
                                  <Link to={`/users/${user.id}`}>
                                    {user.username}
                                  </Link>
                                </TableCell>
                                <TableCell align="right">
                                  {user.email}
                                </TableCell>
                                <TableCell align="right">
                                  {user.password}
                                </TableCell>
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
                                    // onClick={() => this.handleDelete(user)}
                                    onClick={() =>
                                      this.props.deleteUser(user.id)
                                    }
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
const mapStateToProps = state =>({
  users:state.users.users,
  rowsPerPage: state.users.rowsPerPage,
  searchQuery: state.users.searchQuery,
  page: state.users.page
})
export default connect(mapStateToProps, 
  {getUsers, deleteUser, changePage, changeRows, searchHandler})
  (TableUsers);
