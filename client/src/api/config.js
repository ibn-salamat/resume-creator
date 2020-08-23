import { getToken } from "../utils/token";
import { setLoader, $loader } from "../store/loader";

const baseURL = "/api/";
export const API_SIGNUP = "auth/signup";
export const API_SIGNIN = "auth/signin";

export const API_GET_USER_DATA = (id) => `users/${id}`;
export const API_GET_USERS = (length) => `users/list/${length}`;

export const API_GET_RESUMES = (length) => `resumes/list/${length}`;
export const API_GET_RESUME_BY_ID = (id) => `resumes/${id}`;
export const API_SAVE_RESUME = (id) => `resumes/save/${id}`;

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
      const data = await res.json();
      const { message, error } = data;
      if (error) throw new Error(message);
      if (!res.ok) throw new Error(res.statusText);
      resolve(data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  });
}

export function getRequest(url, loader) {
  const token = getToken();
  if (loader) {
    changeLoader(loader, true);
  }
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
    } finally {
      if (loader) {
        changeLoader(loader, false);
      }
    }
  });
}

function changeLoader(loader, state) {
  setLoader({ ...$loader.getState(), [loader]: state });
}
