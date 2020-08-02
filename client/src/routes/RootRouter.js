import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// not packages
import { routes } from "./routes";

export const RootRouter = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route) => {
          const { path, component, exact } = route;
          const routeProps = { path, component, exact: !!exact };

          return <Route key={path} {...routeProps} />;
        })}
      </Switch>
    </Router>
  );
};
