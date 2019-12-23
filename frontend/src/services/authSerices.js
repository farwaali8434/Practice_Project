import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEnpoint = apiUrl + "/api/auth/login";

export function login(username, password) {
  return http.post(apiEnpoint, { username:username, password:password });
}
