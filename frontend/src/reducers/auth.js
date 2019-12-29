import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from "./../actions/types";
import jwtDecode from "jwt-decode";

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  user: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: jwtDecode(action.payload.token),
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAILED:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
        jwtToken: null
      };
    default:
      return state;
  }
}
