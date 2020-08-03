import React, { useEffect } from "react";
import { Menu, Header as HeaderComponent, Button } from "grommet";
import { Home } from "grommet-icons";
import { userChange } from "../store/stores";
import { useHistory, NavLink } from "react-router-dom";

const _accountMenuItems = {
  isAuthenticated: [
    {
      label: "My Profile",
    },
    {
      label: "Sign Out",
      beforePush: () => {},
    },
  ],
  isNotAuthenticated: [
    {
      label: "Sign Up",
      path: "/signup",
    },
    {
      label: "Sign In",
      path: "/signin",
    },
  ],
};

export const Header = ({ user }) => {
  const history = useHistory();
  const { isAuthenticated, isNotAuthenticated } = _accountMenuItems;
  const accountMenuItems = user ? isAuthenticated : isNotAuthenticated;
  accountMenuItems.forEach(
    (menu) =>
      (menu.onClick = () => {
        const { path, beforePush } = menu;
        if (beforePush) beforePush();
        history.push(path);
      })
  );

  return (
    <>
      <h1 align="center">Resume Creator</h1>
      <HeaderComponent background="brand">
        <NavLink to="/">
          <Button hoverIndicator icon={<Home />} />
        </NavLink>

        <Menu label="account" items={accountMenuItems} />
      </HeaderComponent>
    </>
  );
};
