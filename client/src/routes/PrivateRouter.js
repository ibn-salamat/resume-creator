import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStore } from "effector-react";
import { $user } from "../store/user";

export const PrivateRouter = ({ path, ...routeProps }) => {
  const user = useStore($user);

  if (user) {
    return <Route key={path} {...routeProps} exact />;
  }

  return <Redirect to="/signin" />;
};
