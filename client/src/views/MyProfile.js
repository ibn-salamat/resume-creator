import React, { useEffect } from "react";
import { $user } from "../store/user";
import { useStore } from "effector-react";

import { Button } from "grommet";
import { Link } from "react-router-dom";

export const MyProfile = () => {
  const user = useStore($user);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      <h1>My Profile</h1>

      {user && user.fullDataLoaded && (
        <>
          <h2>Name: {user.name}</h2>
          <h3>Resumes list: {user.resumes.length}</h3>
          <Button primary>
            <Link to="/resumes/create">Create new</Link>
          </Button>
        </>
      )}
    </div>
  );
};
