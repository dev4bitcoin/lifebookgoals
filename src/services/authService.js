import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
const userKey = "user";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email: email,
    password: password,
  });

  localStorage.setItem(userKey, jwt);
}

export function logout() {
  localStorage.removeItem(userKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(userKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(userKey);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(userKey, jwt);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
