import { userChange } from "../store/stores";
import decode from "jwt-decode";

export function checkToken() {
  const token = JSON.parse(localStorage.getItem("resume-app-token"));

  if (token) {
    const { userId, exp } = decode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("resume-app-token");
      // set toast
    } else userChange(userId);
  }
}

export function setToken(token) {
  localStorage.setItem("resume-app-token", JSON.stringify(token));
}
