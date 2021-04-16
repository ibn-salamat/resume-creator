import { getRequest } from "../utils/requests";
import { API_GET_USER_DATA, API_GET_USERS } from "./config";
import { updateUsersList } from "../store/usersList";
import { userChange } from "../store/user";

export const getUserById = async (id) => {
  const url = API_GET_USER_DATA(id);
  const data = await getRequest({
    url,
    options: {
      loader: "get_user_by_id",
    },
  });
  userChange({ ...data.data, id: data.data._id, fullDataLoaded: true });
  return data;
};

export const getUsers = async (length) => {
  const url = API_GET_USERS(length);
  const data = await getRequest({
    url,
    options: {
      loader: "get_users",
    },
  });

  updateUsersList(data.data);
};
