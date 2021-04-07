import React from "react";
import { Switch } from "react-router-dom";

// not packages
import { CRoute } from "./CRoute";
import { routes } from "./routes";

export const RootRouter = () => {
  return (
    <Switch>
      {routes.map((route) => {
        return <CRoute key={route.path} {...route} exact />;
      })}
    </Switch>
  );
};
