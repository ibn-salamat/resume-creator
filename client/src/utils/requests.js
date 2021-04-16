import { ToastContainer, toast } from "react-toastify";

import { baseURL } from "../api/config";
import { getToken } from "../utils/token";
import { setLoader, $loader } from "../store/loader";

export function postRequest({ url, body, options }) {
  const token = getToken();

  const { loader } = options;
  if (loader) {
    changeLoader(loader, true);
  }

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
      toast.error(error.message || "Something went wrong");
    } finally {
      if (loader) {
        changeLoader(loader, false);
      }
    }
  });
}

export function getRequest({ url, options }) {
  const token = getToken();

  const { loader } = options;
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
