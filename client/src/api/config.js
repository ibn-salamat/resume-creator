export const baseURL = "/api/";

export const API_SIGNUP = "auth/signup";
export const API_SIGNIN = "auth/signin";

export const API_GET_USER_DATA = (id) => `users/${id}`;
export const API_GET_USERS = (length) => `users/list/${length}`;

export const API_GET_RESUMES = (length) => `resumes/list/${length}`;
export const API_GET_RESUME_BY_ID = (id) => `resumes/${id}`;
export const API_SAVE_RESUME = (id) => `resumes/save/${id}`;
