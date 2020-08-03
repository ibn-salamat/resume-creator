import React, { useState } from "react";
import { TextInput, RadioButtonGroup, Button, Select } from "grommet";
import { useForm } from "react-hook-form";

import { API_SIGNUP } from "../api/config";

export const SignUp = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const newData = {
      ...data,
      gender,
    };

    if (data.password !== data.repassword) return (errors.password = true);

    delete newData.repassword;
    fetch(API_SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((r) => r.json())
      .then((data) => console.log(data));
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
        />
      </form>
    </div>
  );
};
