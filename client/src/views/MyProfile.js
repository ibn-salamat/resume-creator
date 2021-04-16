import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { Button } from "grommet";
import { Link, NavLink } from "react-router-dom";

import { $user } from "../store/user";

import { SNavLink } from "../utils/styles";

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
                  <SNavLink
                    to={"resumes/get/" + _id}
                    as={NavLink}
                    color="#7D4CDB"
                  >
                    {title}
                  </SNavLink>
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
