import http from "./httpService";

const apiEndpoint = "/tags";

export async function getTags() {
  return await http.get(apiEndpoint);
}

export async function getTag(id) {
  return await http.get(`${apiEndpoint}/${id}`);
}

export async function deleteTag(id) {
  return await http.delete(`${apiEndpoint}/${id}`);
}

export async function saveTag(id, tag) {
  if (id) {
    return await http.put(`${apiEndpoint}/${id}`, tag);
  } else {
    return await http.post(apiEndpoint, tag);
  }
}
