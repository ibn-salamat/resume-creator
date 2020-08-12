import { Home } from "../views/Home";
import { SignUp } from "../views/SignUp";
import { SignIn } from "../views/SignIn";
import { MyProfile } from "../views/MyProfile";

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
  {
    path: "/signin",
    component: SignIn,
  },
  {
    path: "/myprofile",
    component: MyProfile,
  },
];
