import React, { useEffect } from "react";

export const Users = () => {
  useEffect(() => {
    console.log("did mount");
  }, []);
  return (
    <div>
      <h1>Users</h1>
    </div>
  );
};
