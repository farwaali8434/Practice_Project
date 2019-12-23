import http from "./httpService";
import {apiUrl} from '../config.json';

const apiEndpoint = apiUrl + "/api/users/";
const apiEndpointAuth = apiUrl + "/api/auth/register"

export function getUsers(){
    return http.get(apiEndpoint);
}
export function deleteUsers(userId){
    return http.delete(apiEndpoint  + userId + '/');
}
export function getUser(userId){
    return http.get(apiEndpoint + userId +'/');
}
export function saveUser(user){

    if(user.id){
        const body = {...user};
        delete body.id;
        return http.put(apiEndpoint + user.id + '/', body);
    }
    return http.post(apiEndpointAuth, {
        email: user.email,
        username: user.username,
        password: user.password,
        read_book: user.read_book,
        delete_book: user.delete_book,
        update_book: user.update_book,
        is_staff: user.is_staff
    })
}
    