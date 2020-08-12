import { userChange, $user } from "../store/stores";
import decode from "jwt-decode";

export function checkToken() {
  const token = JSON.parse(localStorage.getItem("resume-app-token"));
  const user = $user.getState();

  if (token) {
    const { userId, exp } = decode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("resume-app-token");
      // set toast
    } else {
      if (!user || user.id !== userId) {
        userChange({ id: userId });
      }
      return token;
    }
  }
}

export function getToken() {
  return JSON.parse(localStorage.getItem("resume-app-token"));
}

export function setToken(token) {
  localStorage.setItem("resume-app-token", JSON.stringify(token));
}
