import { createStore, createEvent } from "effector";

// user
export const userChange = createEvent("User change");
export const $user = createStore(null);

$user.on(userChange, (state, user) => user);
