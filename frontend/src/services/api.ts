import axios from "axios";

export const api = axios.create({
  baseURL: "https://crud-mern-six.vercel.app",
});
