import { getRequest, API_GET_USER_DATA, API_GET_USERS } from "./config";
import { updateUsersList } from "../store/usersList";
import { GET_USER_BY_ID } from "../store/loader";
import { userChange } from "../store/user";

export const getUserById = async (id) => {
  const url = API_GET_USER_DATA(id);
  const data = await getRequest(url, GET_USER_BY_ID);
  userChange({ ...data.data, id: data.data._id, fullDataLoaded: true });
  return data;
};

export const getUsers = async (length) => {
  const url = API_GET_USERS(length);
  const data = await getRequest(url);
  updateUsersList(data.data);
};
