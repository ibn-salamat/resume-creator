import { createStore, createEvent } from "effector";

// loader constants
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_RESUME_BY_ID = "GET_RESUME_BY_ID";
export const GET_RESUMES_LIST = "GET_RESUMES_LIST";

const initialState = {
  GET_USER_BY_ID: false,
  GET_RESUME_BY_ID: false,
  GET_RESUMES_LIST: false,
};

// loader
export const setLoader = createEvent();
export const $loader = createStore(initialState);

$loader.on(setLoader, (state, loader) => loader);
$loader.watch(() => console.log($loader.getState()));
