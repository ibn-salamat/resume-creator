import { createStore, createEvent } from "effector";

// user list
export const $usersList = createStore(null);
export const updateUsersList = createEvent("Users list update");

$usersList.on(updateUsersList, (state, list) => list);
