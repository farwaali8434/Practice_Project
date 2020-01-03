import { GET_IMAGES, ADD_IMAGES, CHANGE_IMAGES , GET_ERRORS} from "../actions/types";
import axios from "axios";
import Cookies from "js-cookie";

export const getImages = () => dispatch => {
  axios
    .get("/api/images/")
    .then(res => {
      dispatch({
        type: GET_IMAGES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
export const addImage = (imageUser, images) => dispatch => {
  axios
    .post("/api/images/", {
      user: imageUser,
      image: images.map(image => image["name"])
    })
    .then(res => {
      dispatch({
        type: ADD_IMAGES,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};
export const imagehandler = image => dispatch => {
  dispatch({
    type: CHANGE_IMAGES,
    images: [...image]
  });
};

export const postForm = form => dispatch => {
  debugger;
  axios
    .post("/api/images/", form
    , {
       withCredentials: true,
       headers: {
        "content-type": "multipart/form-data",
         "X-CSRFToken": Cookies.get("csrftoken")
       }
    }
    )
    .then(res => {
      debugger;
      dispatch({
        type: ADD_IMAGES,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};
