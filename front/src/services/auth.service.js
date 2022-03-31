import axios from "axios";
import jwt_decode from "jwt-decode";
const url = process.env.REACT_APP_SERVER_URL

const register = (nickname) => {
  return axios
    .post(url + "/api/register", {
      nickname
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const login = (nickname) => {
  return axios
    .post(url + "/api/login", {
      nickname
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
      }

      return response.data;
    });

  /*return fetch("http://localhost:5000/api/login", {
    method: 'POST',
    body: JSON.stringify(nickname),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then(JSON.parse)
    .then((response) =>{
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    })
    .then(json => {
      console.log(json);
    });*/
};

const getAllNicknames = () => {
  return axios.get(url + "/api/getAllNicknames");
}
const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const token = JSON.parse(localStorage.getItem("user"));

  if (!token)
    return null;

  return jwt_decode(token);
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getAllNicknames,
};

export default authService;