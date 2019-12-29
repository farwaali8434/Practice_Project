import { GET_USERS, ADD_USER, CHANGE_ROWS, MAP_USER } from "../actions/types.js";
import { DELETE_USER, UPDATE_USER, GET_USER, CHANGE_CHECKBOX} from "../actions/types.js";
import { CHANGE_PAGE, SEARCH } from './../actions/types';



const initialState = {
  users: [],
  searchQuery: "",
  rowsPerPage: 3,
  page: 0,
};
export default function (state = initialState, action){
    switch(action.type){
        case GET_USERS:
            return {
               ...state,
               users: action.payload 
            }
        case DELETE_USER:
            return {
                ...state,
                users:state.users.filter(user=> user.id !== action.payload)
            }
        case ADD_USER:
            {
            return {
            ...state,
            users: [...state.users, action.payload]
            }
        }
        case GET_USER:
        {
           
            return {
                ...state,
                users: action.payload
            }
        }
        case UPDATE_USER:
        {
            return {
            ...state,
            users: [...state.users, action.payload]
            }
        };
        case CHANGE_PAGE:
            {
                return{
                    ...state,
                    page: action.newPage
                }
            }
        case CHANGE_ROWS:
            {
                return {
                    ...state,
                    rowsPerPage:action.rowsPerPage,
                    page: action.page
                }
            }
        case SEARCH:
            {
                return {
                    ...state,
                   searchQuery: action.searchQuery,
                }
            }
        case MAP_USER:
            {
                return {
                    ...state,
                    users: action.user,
                }
            }
        case CHANGE_CHECKBOX:
            {
                return {
                    ...state,
                    users: action.user,
                }
            }
            default:
                return state;
    }

}