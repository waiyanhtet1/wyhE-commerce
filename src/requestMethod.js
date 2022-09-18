import axios from "axios";

const URL = "https://node-api-acl6.onrender.com/api";

let TOKEN;
if (localStorage.getItem("persist:root")) {
  TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).admin)
    .adminUser?.token;
}

export const publicRequest = axios.create({
  baseURL: URL,
});

export const userRequest = axios.create({
  baseURL: URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});