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
};

const getAllNicknames = () => {
  return axios.get(url + "/api/getAllNicknames");
};

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