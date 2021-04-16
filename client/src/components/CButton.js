import React from "react";
import { Button } from "grommet";

export const CButton = ({ loading, children, ...props }) => {
  return (
    <Button
      hoverIndicator="background"
      label={children}
      icon={
        loading ? (
          <div className="lds-dual-ring"></div>
        ) : (
          <div style={{ width: 20, margin: "-2px 0" }}></div>
        )
      }
      {...props}
    ></Button>
  );
};
