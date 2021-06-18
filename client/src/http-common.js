import axios from "axios";

export default axios.create({
  baseURL: window._env_.BOOKSTORE_SERVER_API_URL + ":" + window._env_.BOOKSTORE_SERVER_API_PORT + "/api" 
});