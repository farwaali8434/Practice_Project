import {combineReducers} from 'redux';
import users from "./users";
import errors from "./errors";
import message from './message'
import auth from './auth';
import books from './books';
export default combineReducers({
    users, errors, message, auth, books
});