import http from "./httpService";
import {apiUrl} from "../config.json";


const apiEnpoint= apiUrl +"/api/auth/register";
const apiEndpointPass = apiUrl +'/api/password_reset/';

export function register(user){
    return http.post(apiEnpoint, {first_name: user.firstname,
    last_name:user.lastname,
    email:user.email,
    username:user.email,
    password:user.password,
    confirmpassword:user.confirmpassword});
}

export function forgotpassword(email){
    return http.post(apiEndpointPass,{email:email} );
}

export function changepassword(password, confirmpassword){
    return http.post(apiEnpoint, {password:password, confirmpassword:confirmpassword});
}
