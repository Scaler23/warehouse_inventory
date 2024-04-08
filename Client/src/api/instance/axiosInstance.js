import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3036/api/",
});
