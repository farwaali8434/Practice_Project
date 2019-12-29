import { GET_BOOKS} from '../actions/types';
import axios from 'axios';

export const getBooks = () => dispatch => {
    axios.get('/api/books/')
        .then(res => {
            dispatch({
                type: GET_BOOKS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}