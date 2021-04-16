import { API_SIGNUP, API_SIGNIN } from "./config";
import { postRequest } from "../utils/requests";
import { setToken } from "../utils/token";
import { userChange } from "../store/user";

export const signUp = async (newUser) => {
  await postRequest({
    url: API_SIGNUP,
    body: newUser,
    options: {
      loader: "sign_up",
    },
  });
};

export const signIn = async (user) => {
  const { token, userId } = await postRequest({
    url: API_SIGNIN,
    body: user,
    options: {
      loader: "sign_in",
    },
  });

  setToken(token);
  userChange({ id: userId });
};
