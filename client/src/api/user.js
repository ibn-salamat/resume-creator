import { getRequest, API_GET_USER_DATA } from "./config";
import { userChange } from "../store/stores";

export const getUserById = async (id) => {
  const url = API_GET_USER_DATA(id);
  const data = await getRequest(url);
  userChange({ ...data.data, fullDataLoaded: true });
};
