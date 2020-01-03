import { GET_VIDEOS, ADD_VIDEOS, CHANGE_VIDEOS } from '../actions/types';
const initialState = {
    videos: [],

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOS:
            return {
                ...state,
                videos: action.payload
            }
        case ADD_VIDEOS:
            debugger
            return {
                ...state,
                videos: [...state.videos, action.payload]
            }
        case CHANGE_VIDEOS:
            return {
                ...state,
                videos: action.videos
            }
        default:
            return state;
    }
}
