import axios from "axios";
const htt = import.meta.env.VITE_HTTP
export default axios.create({
  baseURL: htt,
});
