import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL

const getAllPosts = () => {
  return axios.get(url + "/api/getAllPosts");
};

const getPostsById = (id) => {
  return axios.get(url + "/api/getPostsById/" + id);
};

const createPost = (data) => {
  return axios.post(url + "/api/createPost", data);
};

const postService = {
  getAllPosts,
  getPostsById,
  createPost,
};

export default postService;