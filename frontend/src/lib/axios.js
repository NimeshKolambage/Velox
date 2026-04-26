import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3007/api",
  withCredentials: true,
});