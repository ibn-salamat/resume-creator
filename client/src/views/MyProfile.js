import React, { useEffect } from "react";
import { $user } from "../store/user";
import { useStore } from "effector-react";

import { Button } from "grommet";
import { Link, NavLink } from "react-router-dom";
import { A } from "../utils/styles";

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
          {user.resumes.length ? (
            <>
              <h3>Resumes list: </h3>
              {user.resumes.map(({ title, _id }) => (
                <div key={_id}>
                  <A to={"resumes/" + _id} as={NavLink} color="#7D4CDB">
                    {title}
                  </A>
                </div>
              ))}
            </>
          ) : (
            <p>You dont have any resumes</p>
          )}
          <Button primary>
            <Link to="/resumes/create">Create new</Link>
          </Button>
        </>
      )}
    </div>
  );
};
