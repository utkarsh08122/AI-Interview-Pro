"use client";
export const KEY_ACCESS_TOKEN = "RefresToken";

export function getItem(key: any) {
  return localStorage.getItem(key);
}

export function setItem(key: any, value: any) {
  localStorage.setItem(key, value);
}

