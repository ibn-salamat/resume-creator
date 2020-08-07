import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RootRouter } from "./routes/RootRouter";
import { Grommet } from "grommet";
import { Header } from "./components/Header";

import { useStore } from "effector-react";
import { $user, userChange } from "./store/stores";
import { checkToken } from "./utils/token";

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

  return (
    <Router>
      <Grommet theme={theme}>
        <Header user={user} />
        <RootRouter />
      </Grommet>
    </Router>
  );
}
