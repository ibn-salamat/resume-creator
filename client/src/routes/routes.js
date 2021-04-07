import { Home } from "../views/Home";
import { SignUp } from "../views/SignUp";
import { SignIn } from "../views/SignIn";
import { MyProfile } from "../views/MyProfile";
import { Users } from "../views/Users";
import { CreateResume } from "../views/CreateResume/";
import { User } from "../views/User";
import { Resumes } from "../views/Resumes";
import { Resume } from "../views/Resume";
import { EditResume } from "../views/EditResume";

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
    isPrivate: true,
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
    path: "/resumes/get/:resumeId",
    component: Resume,
  },
  {
    path: "/resumes/edit/:resumeId",
    component: EditResume,
    isPrivate: true,
  },
];
