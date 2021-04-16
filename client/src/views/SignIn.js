import React from "react";
import { TextInput, Card } from "grommet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStore } from "effector-react";
import styled from "styled-components";

import { CButton } from "../components/CButton";
import { SNavLink } from "../utils/styles";
import { signIn } from "../api/auth";
import { $loader } from "../store/loader";
import { colors } from "../utils/contstants";

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
    <Card
      elevation="medium"
      width="large"
      style={{
        margin: "30px auto 0 auto",
        padding: "10px 30px",
        maxWidth: 600,
      }}
    >
      <h2>Sign In</h2>

      <form>
        <p>Email</p>
        <TextInput name="email" ref={register({ required: true })} />
        {/* {errors.email && "Email is required"} */}
        <br />
        <p>Password</p>
        <TextInput
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        {/* {errors.password && "Password is required"} */}
        <br />
        <SButtons>
          <SNavLink to="/restore-password" color={colors.primary}>
            Forgot password
          </SNavLink>

          <CButton
            loading={loader.sign_in}
            disabled={loader.sign_in}
            onClick={handleSubmit(onSubmit)}
            primary
          >
            Sign In
          </CButton>
        </SButtons>
      </form>
    </Card>
  );
};

const SButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
