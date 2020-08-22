import { getToken } from "../utils/token";

const baseURL = "http://localhost:3000/api/";
export const API_SIGNUP = "auth/signup";
export const API_SIGNIN = "auth/signin";

export const API_GET_USER_DATA = (id) => `users/${id}`;
export const API_GET_USERS = (length) => `users/list/${length}`;
export const API_SAVE_RESUME = (id) => `resume/save/${id}`;

export function postRequest(url, body) {
  const token = getToken();
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(baseURL + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(res.statusText);
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
      const res = await fetch(baseURL + url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      const { message, error } = data;
      if (error) throw new Error(message);
      resolve(data);
    } catch (error) {
      console.error(error);
    }
  });
}
