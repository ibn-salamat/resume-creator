import React, { useEffect } from "react";
import { RootRouter } from "./routes/RootRouter";
import { Grommet } from "grommet";

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
  useEffect(() => {
    console.log("did mount!");
  }, []);
  return (
    <Grommet theme={theme}>
      <RootRouter />
    </Grommet>
  );
}
