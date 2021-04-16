import React, { useState } from "react";
import { TextInput, Select } from "grommet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CButton } from "../components/CButton";
import { signIn } from "../api/auth";

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
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

        <CButton
          loading={loading}
          onClick={() => {
            console.log(loading)
            setLoading(!loading);
          }}
        >
          Sign In
        </CButton>
      </form>
    </div>
  );
};
