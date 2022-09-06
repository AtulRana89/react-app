import Api from "./DbConfig/ApiActions";
import { apiGetMethod } from "./DbConfig/ApiGetMethod";
import { apiPostMethod } from "./DbConfig/ApiPostMethod";
import { apiPutMethod } from "./DbConfig/ApiPutMethod";

export const GetUsers = (perPage, offset, token) => {
  return new Promise((resolve, reject) => {
    console.log(JSON.stringify(token));
    let url = "https://node-firbase.herokuapp.com/userList";

    // let url = Api.GRT_USER_LIST;
    url += `?offset=${offset}&limit=${perPage}`;
    apiGetMethod(url, token)
      .then((response) => {
        debugger;
        resolve(response);
        // resolve(response.data.Data)
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// API of Login
export const login = (data) => {
  return new Promise((resolve, reject) => {
    let url = Api.LOGIN,
      headers = "";
    apiPostMethod(url, data, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
