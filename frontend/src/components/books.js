import React, { Component } from "react";
import { Form } from "./form";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material/react-button";
import { Link } from 'react-router-dom';
import {getBooks} from '../actions/books';
import { connect } from 'react-redux';
class Books extends Form {
  state = {
    books: []
  };
  // async componentDidMount() {
  //   const { data: books } = await getBooks();
  //   this.setState({ books });
  // }
  componentDidMount(){
    this.props.getBooks();
  }
  render() {
    const {user} = this.props;
    const {books} =this.props;
    return (
      <React.Fragment>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Book Name</TableCell>
                  <TableCell align="right">Author Name</TableCell>
                  <TableCell align="right"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map(book => {
                  return (
                    <TableRow key={book.id}>
                      <TableCell align="left">
                        <Link to={`/books/${book.id}`}>{book.book_name}</Link>
                      </TableCell>
                      <TableCell align="right">{book.book_author}</TableCell>
                      {user.delete_book && (
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
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state =>(
{
  user:state.auth.user,
  books: state.books.books
}
)
export default connect(mapStateToProps, {getBooks})(Books);
