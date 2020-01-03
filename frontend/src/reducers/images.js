import { GET_IMAGES,  ADD_IMAGES, CHANGE_IMAGES } from '../actions/types';
const initialState = {
    images: [],

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_IMAGES:
            return {
                ...state,
                images: action.payload
            }
        case ADD_IMAGES:
            debugger
            return {
                ...state,
                images: [...state.images, action.payload]
            }
        case CHANGE_IMAGES:
            return{
                ...state,
                images:action.images
            }
        default:
            return state;
    }
}
