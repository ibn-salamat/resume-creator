import React, { useEffect } from "react";
import { Menu, Header as HeaderComponent, Button } from "grommet";
import { Home } from "grommet-icons";
import { useHistory, NavLink } from "react-router-dom";

import { removeToken } from "../utils/token";
import { userChange } from "../store/user";

const links = [
  {
    label: "Users list",
    path: "/users",
  },
  {
    label: "Resume list",
    path: "/resumes",
  },
  {
    label: "About us",
    path: "/about",
  },
];

const _accountMenuItems = {
  isAuthenticated: [
    {
      label: "My Profile",
      path: "/myprofile",
    },
    {
      label: "Sign Out",
      beforePush: () => {
        userChange(null);
        removeToken();
      },
      path: "/signin",
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

        {links.map(({ label, path }) => {
          return (
            <Button key={label}>
              <NavLink to={path}>{label}</NavLink>
            </Button>
          );
        })}
        <Menu label="account" items={accountMenuItems} />
      </HeaderComponent>
    </>
  );
};
