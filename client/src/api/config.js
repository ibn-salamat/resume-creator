import { getToken } from "../utils/token";

const baseURL = "api";
export const API_SIGNUP = "api/auth/signup";
export const API_SIGNIN = "api/auth/signin";

export const API_GET_USER_DATA = (id) => `api/users/${id}`;
export const API_GET_USERS = (length) => `api/users/list/${length}`;

export function postRequest(url, body) {
  const token = getToken();
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const { message, error } = data;
      if (error) throw new Error(message);
      resolve(data);
    } catch (error) {
      console.error(error);
    }
  });
}

export function getRequest(url) {
  const token = getToken();
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const { message, error } = data;
      if (error) throw new Error(message);
      resolve(data);
    } catch (error) {
      console.error(error);
    }
  });
}
