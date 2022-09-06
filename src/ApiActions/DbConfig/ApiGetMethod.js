import axios from "axios";
import { apiCommonParams } from "./ApiBaseUrl";
import { api } from "./ApiActions";

export const apiGetMethod = (url, token) => {
  return new Promise((resolve, reject) => {
    let headers = {};
    if (token) {
      headers = {
        // Authorization: `bearer ${token}`
        Authorization: `${token}`
      };
    }
    axios
      .get(url, { headers })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        debugger;
        if (err.response && err.response.status === 400) {
          // window.history.pushState("", "", `login`);
          setTimeout(() => {
            // window.location.reload();
          }, 100);
        }
        //reject(err)
        // err.response
        //   ? err.response.status === 401
        //     ? pageRedirect("#/login")
        //     : err.response && err.response.status === 500
        //     ? pageRedirect("#/login")
        //     : reject(err)
        //   : pageRedirect("#/login");
      });
  });
};

export function updateLocalStorage(reduxData) {
  localStorage.setItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`, JSON.stringify(reduxData));
}
export function pageRedirect(pageName) {
  let reduxData = JSON.parse(localStorage.getItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`));
  let authReducer = JSON.parse(reduxData.login),
    loginUserInfo = {
      loginUserInfo: {}
    };
  authReducer.login = loginUserInfo;
  reduxData.login = JSON.stringify(authReducer);
  updateLocalStorage(reduxData);
  setTimeout(() => {
    window.history.pushState("", "", `/${pageName}`);
    window.location.reload();
  }, 100);
}
