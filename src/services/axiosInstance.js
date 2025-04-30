import axios from "axios";

export const instance = axios.create({
  // baseURL: "http://localhost:8080/api/v1",
  baseURL: "https://localhost:8080/api/v1",
  // timeout: 1000,
  headers: { "Content-Type": "application/json" },
});
