import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useStore } from "effector-react";

import { getUserById } from "../api/user";
import { $loader } from "../store/loader";
import { SNavLink } from "../utils/styles";

export function User() {
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState({});
  const loader = useStore($loader);

  const getUser = async () => {
    const data = await getUserById(userId);
    if (!data.error) {
      setUser(data.data);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const { name, lastname, resumes = [] } = user;

  return (
    <div>
      <h1>User</h1>

      {loader ? (
        <p>Loading</p>
      ) : (
        <>
          <p>
            {name}
            {lastname}
          </p>
          <p>Resumes:</p>
          {resumes.map(({ title, _id }) => (
            <SNavLink
              key={_id}
              to={`/resumes/get/${_id}`}
              color="#7D4CDB"
              as={NavLink}
            >
              {title}
            </SNavLink>
          ))}
        </>
      )}
    </div>
  );
}
