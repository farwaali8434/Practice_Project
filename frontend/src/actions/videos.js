import { GET_VIDEOS, ADD_VIDEOS, CHANGE_VIDEOS } from '../actions/types';
import axios from 'axios';

export const getVideos = () => dispatch => {
    axios.get('/api/videos/')
        .then(res => {
            dispatch({
                type: GET_VIDEOS,
                payload: res.data
            });
        }).catch(err => console.log(err));

}
export const addVideo = (videoUser, video) => dispatch => {
  
    axios
        .post("/api/videos/", { user: videoUser, video: video})
        .then(res => {
            dispatch({
                type: ADD_VIDEOS,
                payload: res.data
            });
        })
        .catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            });
        });
}
export const videohandler = (video) => dispatch => {
    dispatch({
        type: CHANGE_VIDEOS,
        videos: [...video]
    })
};