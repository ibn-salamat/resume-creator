import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { Link, NavLink } from "react-router-dom";
import { Anchor } from "grommet";

import { getUsers } from "../api/user";
import { $usersList } from "../store/usersList";
import { SNavLink } from "../utils/styles";

export const Users = () => {
  const users = useStore($usersList);
  useEffect(() => {
    getUsers("all");
  }, []);

  console.log(users);
  return (
    <div>
      <h1>Users</h1>
      {users === null && <p>Loading</p>}
      {users &&
        users.map(({ name, lastname, _id, resumes }) => {
          return (
            <div key={_id}>
              <SNavLink to={"users/" + _id} as={NavLink} color="#7D4CDB">
                {name} {lastname}
              </SNavLink>
              {resumes.length !== 0 && <p>{resumes.length} resumes</p>}
            </div>
          );
        })}
    </div>
  );
};
