import http from "./httpService";
import { apiUrl } from "./config.json";

const apiEndpoint = apiUrl + "/subscribers";

export async function getSubscribers() {
  return await http.get(apiEndpoint);
}
export async function subscribe(email) {
  return await http.post(apiEndpoint, email);
}
