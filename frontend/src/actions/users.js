import axios from 'axios';
import { GET_USERS, DELETE_USER, UPDATE_USER, 
  ADD_USER, GET_USER, GET_ERRORS, CHANGE_PAGE, 
  CHANGE_ROWS, SEARCH, MAP_USER, CHANGE_CHECKBOX } from './types';
import { createMessage } from './messages';

// get users
export const getUsers = () => dispatch =>{
    axios.get('/api/users/')
    .then(res => {
        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}
// delete user
export const deleteUser = (id) => dispatch => {
  axios
    .delete(`/api/users/${id}/`)
    .then(res => {
      dispatch(createMessage({userDeleted: 'User Deleted'}))
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    })
    .catch(err => console.log(err));
};
// adding user
export const addUser = fd => dispatch => {
  axios
    .post("/api/users/", fd)
    .then(res => {
      dispatch({
        type: ADD_USER,
        payload: res.data
      });
      console.log(res);
    })
    .catch(err => {
      const errors = {
      msg:err.response.data,
      status: err.response.status
    }
    dispatch({
      type: GET_ERRORS,
      payload: errors
    });
});
}
// updating user
export const updateUser = (id, user) => dispatch => {
  axios
    .put(`/api/users/${id}/`, user)
    .then(res => {
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
//getting single user

export const getUser = id => dispatch => {
  axios
    .get(`/api/users/${id}/`)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      } );
    })
    .catch(err => console.log(err));
};

export const changePage = newPage => dispatch => {
  dispatch({
    type: CHANGE_PAGE,
    newPage: newPage
  })
};
export const changeRows = (rowsPerPage, page) => dispatch => {
  dispatch({
    type: CHANGE_ROWS,
    rowsPerPage: rowsPerPage,
    page:page
  })
};
export const searchHandler = (searchQuery) => dispatch => {
  dispatch({
    type: SEARCH,
    searchQuery: searchQuery
  })
};
export const mappingUser = (user) => dispatch => {
  dispatch({
    type: MAP_USER,
    user: user
  })
};

export const checkBoxChange = (user) => dispatch => {
  dispatch({
    type: CHANGE_CHECKBOX,
    user: user
  })
};
//Saving User
export const saveUser = user => dispatch => {
  if(user.id){
      let body = {...user};
      delete body.id;
    axios.put('/api/users/' + user.id + '/', body)
    .then(res => {
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    })
      .catch(err => console.log(err));
    }
  else{
  axios.post('/api/auth/register', user
    ).then(res=>{
      dispatch({
        type:ADD_USER,
        payload:res.data
      });
    });
  }
  }