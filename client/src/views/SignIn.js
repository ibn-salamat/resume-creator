import React, { useState } from "react";
import { TextInput, Button, Select } from "grommet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { signIn } from "../api/auth";

export const SignIn = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    await signIn(data);
    history.push("/myprofile");
  };

  return (
    <div>
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>Email</p>
          <TextInput name="email" ref={register({ required: true })} />
        </div>

        <div>
          <p>Password</p>
          <TextInput name="password" ref={register({ required: true })} />
        </div>

        <Button
          hoverIndicator="background"
          type="submit"
          primary
          label="Submit"
          icon={<div className="lds-dual-ring"></div>}
        ></Button>
      </form>
    </div>
  );
};
