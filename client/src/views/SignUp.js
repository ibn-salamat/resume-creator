import React, { useState } from "react";
import { TextInput, Button, Select } from "grommet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { signUp } from "../api/auth";

export const SignUp = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const newData = {
      ...data,
      gender,
    };

    if (data.password !== data.repassword) return;

    delete newData.repassword;
    await signUp(newData);
    history.push("/");
  };

  const [gender, setGender] = useState("male");
  return (
    <div>
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>Email</p>
          <TextInput name="email" ref={register({ required: true })} />
        </div>

        <div>
          <p>Name</p>
          <TextInput name="name" ref={register({ required: true })} />
        </div>

        <div>
          <p>Last name</p>
          <TextInput name="lastname" ref={register({ required: true })} />
        </div>

        <div>
          <p>Пол</p>
          <Select
            name="gender"
            options={["male", "female"]}
            value={gender}
            onChange={({ option }) => setGender(option)}
          />
        </div>

        <div>
          <p>Password</p>
          <TextInput name="password" ref={register({ required: true })} />
        </div>

        <div>
          <p>Repeat password</p>
          <TextInput name="repassword" ref={register({ required: true })} />
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
