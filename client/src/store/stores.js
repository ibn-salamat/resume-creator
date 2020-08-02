import { createStore, createEvent } from "effector";

export const userChanged = createEvent("User changed");

export const $user = createStore(null);

// store.on(event, (state, payload) => newState)

$user.on(userChanged, (state, newState) => newState);

$user.watch((state, payload) => console.log(state));
