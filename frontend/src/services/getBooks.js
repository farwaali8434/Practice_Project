import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/api/books/";
const apiEndpointAuth = apiUrl + "/api/auth/register";

export function getBooks() {
  return http.get(apiEndpoint);
}
export function deleteBooks(userId) {
  return http.delete(apiEndpoint + userId + "/");
}
export function getBook(userId) {
  return http.get(apiEndpoint + userId + "/");
}
export function saveBook(book) {
  if (book.id) {
    const body = { ...book };
    delete body.id;
    return http.put(apiEndpoint + book.id + "/", body);
  }
//   return http.post(apiEndpointAuth, {
//    book_name:book.book_name,
//    book_author:book.book_author
}
