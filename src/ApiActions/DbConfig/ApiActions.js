import { apiBaseUrl } from "./ApiBaseUrl";
export const api = {
  LOGIN: `${apiBaseUrl}/admins/login`,
  // GRT_USER_LIST: `${apiBaseUrl}/user/userList/list`
  // GRT_USER_LIST: `${apiBaseUrl}/user/userList`
  GRT_USER_LIST: `${apiBaseUrl}/user/userList`
};
export default api;
