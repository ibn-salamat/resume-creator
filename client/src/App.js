import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useStore } from "effector-react";
import { Grommet } from "grommet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RootRouter } from "./routes/RootRouter";
import { Header } from "./components/Header";

import { $user } from "./store/user";
import { checkToken } from "./utils/token";
import { getUserById } from "./api/user";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

export function App() {
  const user = useStore($user);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (user && user.id && !user.fullDataLoaded) {
      getUserById(user.id);
    }
  }, [user]);

  return (
    <Router>
      <Grommet theme={theme}>
        <Header user={user} />
        <RootRouter />
        <ToastContainer autoClose={2500} />
      </Grommet>
    </Router>
  );
}
