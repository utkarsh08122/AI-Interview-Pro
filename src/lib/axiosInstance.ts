"use client";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL:process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});
// export const axiosClient = axios.create({
//   baseURL: "http://localhost:3000",
//   withCredentials: true,
// });
