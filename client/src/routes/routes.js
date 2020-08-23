import { Home } from "../views/Home";
import { SignUp } from "../views/SignUp";
import { SignIn } from "../views/SignIn";
import { MyProfile } from "../views/MyProfile";
import { Users } from "../views/Users";
import { CreateResume } from "../views/CreateResume/";
import { User } from "../views/User";
import { Resumes } from "../views/Resumes";
import { Resume } from "../views/Resume";

export const routes = [
  {
    path: "/",
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
    path: "/users/:userId",
    component: User,
  },
  {
    path: "/resumes/create",
    component: CreateResume,
  },
  {
    path: "/resumes",
    component: Resumes,
  },
  {
    path: "/resumes/:resumeId",
    component: Resume,
  },
];
