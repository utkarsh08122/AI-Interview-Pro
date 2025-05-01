"use client";
import axios from "axios";
import { KEY_ACCESS_TOKEN, getItem } from "./localStorageManager";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  const RefresToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${RefresToken}`;
  return request;
});

