import React from "react";
import { Route } from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";

export const CRoute = (props) => {
  const { isPrivate } = props;

  if (isPrivate) {
    return <PrivateRouter {...props} />;
  }

  return <Route {...props} />;
};
