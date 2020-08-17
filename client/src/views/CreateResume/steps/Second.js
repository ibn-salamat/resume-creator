import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { TextInput, Anchor, Button } from "grommet";
import { useStore } from "effector-react";
import { NavLink } from "react-router-dom";
import { $user } from "../../../store/user";

export function Second() {
  const user = useStore($user);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <H2>Second step</H2>

      {user.fullDataLoaded && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <p>Name:</p>
            <TextInput
              name="name"
              ref={register({ required: true })}
              defaultValue={user.name}
            />
          </Field>

          <Field>
            <p>Lastname:</p>
            <TextInput
              name="lastname"
              ref={register({ required: true })}
              defaultValue={user.lastname}
            />
          </Field>

          <Field>
            <p>Date of birth:</p>
            <TextInput
              name="birthday"
              ref={register({ required: true })}
              defaultValue={user.birthday}
            />
          </Field>

          <Field>
            <p>Email:</p>
            <TextInput
              name="email"
              ref={register({ required: true })}
              defaultValue={user.email}
            />
          </Field>

          <Button primary type="submit">
            Next
          </Button>
        </form>
      )}
    </div>
  );
}

const H2 = styled.h2`
  font-weight: 100;
`;

const ColoredNavLink = styled(NavLink)`
  color: #7d4cdb;
`;

const Field = styled.div`
  border: 1px solid red;
  margin: 10px 0;
`;
