import React, { useEffect } from "react";
import { $user } from "../store/stores";
import { useStore } from "effector-react";

export const MyProfile = () => {
  const user = useStore($user);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      <h1>My Profile</h1>

      {user && user.fullDataLoaded && <h2>{user.name}</h2>}
    </div>
  );
};
