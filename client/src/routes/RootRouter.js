import React from "react";
import { Switch, Route } from "react-router-dom";

// not packages
import { routes } from "./routes";

export const RootRouter = () => {
  return (
    <Switch>
      {routes.map((route) => {
        const { path, component, exact } = route;
        const routeProps = { path, component, exact: !!exact };

        return <Route key={path} {...routeProps} />;
      })}
    </Switch>
  );
};
