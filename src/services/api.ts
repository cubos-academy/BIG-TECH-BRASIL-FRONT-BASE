import axios from "axios";

const api = axios.create({
  baseURL: "https://big-tech-brasil.cyclic.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
