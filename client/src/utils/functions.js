import { setLoader, $loader } from "../store/loader";

export function changeLoader(loader, state) {
  setLoader({ ...$loader.getState(), [loader]: state });
}
