import { Home } from "../views/Home";
import { SignUp } from "../views/SignUp";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/signup",
    component: SignUp,
  },
];
