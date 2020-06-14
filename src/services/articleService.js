import http from "./httpService";
import { apiUrl } from "./config.json";

const apiEndpoint = apiUrl + "/articles";

export function getArticles(pageNumber, pageSize) {
  return http.get(
    `${apiEndpoint}?pageNumber= ${pageNumber}&&pageSize=${pageSize}`
  );
}

export function getArticleArchives() {
  return http.get(`${apiEndpoint}/archives`);
}

export function getFeaturedArticles() {
  return http.get(`${apiEndpoint}/featured`);
}

export function getPopularArticles() {
  return http.get(`${apiEndpoint}/popular`);
}

export function getArticleStub() {
  return http.get(`${apiEndpoint}/stub`);
}

export function getArticlesByTag(id, pageNumber, pageSize) {
  return http.get(
    `${apiEndpoint}/byTag/${id}?pageNumber= ${pageNumber}&&pageSize=${pageSize}`
  );
}

export function getArticle(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

export function getSearchSuggestions(title) {
  return http.get(`${apiEndpoint}/search/${title}`);
}

export function deleteArticle(id) {
  return http.delete(`${apiEndpoint}/${id}`);
}

export function saveArticle(id, article) {
  if (id) {
    return http.put(`${apiEndpoint}/${id}`, article);
  } else {
    return http.post(apiEndpoint, article);
  }
}

export function updateCount(id) {
  return http.post(`${apiEndpoint}/updateCount/${id}`);
}
