import React, { useEffect } from "react";
import { getUsers } from "../api/user";
import { useStore } from "effector-react";
import { $usersList } from "../store/usersList";

export const Users = () => {
  const users = useStore($usersList);
  async function asyncGetUsers(length) {
    await getUsers(10);
  }
  useEffect(() => {
    asyncGetUsers(10);
  }, []);

  console.log(users);
  return (
    <div>
      <h1>Users</h1>
      {users === null && <p>Loading</p>}
      {users &&
        users.map((user) => {
          return <p key={user._id}>{user.name}</p>;
        })}
    </div>
  );
};
