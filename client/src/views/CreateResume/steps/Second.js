import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { TextInput } from "grommet";
import { useStore } from "effector-react";
import { $user } from "../../../store/user";

export function Second() {
  const user = useStore($user);
  console.log(user);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <H2>Second step</H2>

      {user.fullDataLoaded && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>Fullname</p>
            <TextInput
              name="fullname"
              disabled
              ref={register({ required: true })}
              value="ss"
            />
          </div>
        </form>
      )}
    </div>
  );
}

const H2 = styled.h2`
  font-weight: 100;
`;
