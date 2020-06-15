import http from "./httpService";

const apiEndpoint = "/subscribers";

export async function getSubscribers() {
  return await http.get(apiEndpoint);
}
export async function subscribe(email) {
  return await http.post(apiEndpoint, email);
}
