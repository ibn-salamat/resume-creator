import React from "react";
import { useStore } from "effector-react";

import { $user, userChanged } from "../store/stores";

export const Home = () => {
  const user = useStore($user);

  return (
    <div>
      <h1>Home</h1>

      <button
        onClick={() => {
          userChanged(!user);
        }}
      ></button>
    </div>
  );
};
