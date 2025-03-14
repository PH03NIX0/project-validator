import axios from "axios";

export const instance = axios.create({
  baseURL: "https://project-validator.onrender.com/api/v1",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});
