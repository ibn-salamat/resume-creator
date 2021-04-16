import React, { useState } from "react";
import { TextInput, Select } from "grommet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStore } from "effector-react";
import { CButton } from "../components/CButton";
import { signIn } from "../api/auth";
import { $loader } from "../store/loader";

export const SignIn = () => {
  const history = useHistory();
  const loader = useStore($loader);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    handleSubmit();
    await signIn(data);
    history.push("/myprofile");
  };

  return (
    <div>
      <h2>Sign In</h2>

      <form>
        <div>
          <p>Email</p>
          <TextInput name="email" ref={register({ required: true })} />
          {/* {errors.email && "Email is required"} */}
        </div>

        <div>
          <p>Password</p>
          <TextInput
            type="password"
            name="password"
            ref={register({ required: true })}
          />
          {/* {errors.password && "Password is required"} */}
        </div>

        <CButton onClick={handleSubmit(onSubmit)}>Sign In</CButton>
      </form>
    </div>
  );
};
