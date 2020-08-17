import { Home } from "../views/Home";
import { SignUp } from "../views/SignUp";
import { SignIn } from "../views/SignIn";
import { MyProfile } from "../views/MyProfile";
import { Users } from "../views/Users";
import { CreateResume } from "../views/CreateResume/";

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
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/resumes/create",
    component: CreateResume,
  },
];
