import { postRequest, API_SIGNUP, API_SIGNIN } from "./config";
import { setToken } from "../utils/token";
import { userChange } from "../store/user";

export const signUp = async (newUser) => {
  await postRequest(API_SIGNUP, newUser);
};

export const signIn = async (user) => {
  const { token, userId } = await postRequest(API_SIGNIN, user);
  setToken(token);
  userChange({ id: userId });
};
