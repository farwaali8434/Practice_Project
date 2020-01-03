import {
  USER_LOADED,
  AUTH_ERROR,
  USER_LOADING,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from "./types";
import axios from "axios";

export const login = (username, password) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: LOGIN_FAILED,
        payload: errors
      });
    });
};
export const logout = () => (dispatch, getState) => {
  const token = getState().auth.jwttoken;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  axios.get("/api/auth/logout", config).then(res => {
    dispatch({
      type: USER_LOADED,
      payload: res.data
    }).catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: AUTH_ERROR,
        payload: errors
      });
    });
  });
};

export const autoLogin = jwt => dispatch => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {token: jwt}
  });
};
