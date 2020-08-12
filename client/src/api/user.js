import { getRequest, API_GET_USER_DATA, API_GET_USERS } from "./config";
import { userChange } from "../store/stores";

export const getUserById = async (id) => {
  const url = API_GET_USER_DATA(id);
  const data = await getRequest(url);
  userChange({ ...data.data, fullDataLoaded: true });
};

export const getUsers = async (length) => {
  const url = API_GET_USERS(length);
  const data = await getRequest(url);
  console.log(data);
};
