import { createStore, createEvent } from "effector";

// loader
export const setLoader = createEvent();
export const $loader = createStore({});

$loader.on(setLoader, (state, loader) => loader);
// $loader.watch(() => console.log($loader.getState()));
