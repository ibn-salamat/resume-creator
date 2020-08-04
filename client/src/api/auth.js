import { postRequest, API_SIGNUP } from "./config";

export const signUp = async (newUser) => {
  const data = await postRequest(API_SIGNUP, newUser);
  console.log(data);
};
