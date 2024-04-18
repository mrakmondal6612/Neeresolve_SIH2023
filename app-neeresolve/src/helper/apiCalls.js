import axios from "axios";
import * as SecureStore from "expo-secure-store";

const baseUrl = `http://192.168.29.157:5000/api`;

export const makeRequest = axios.create({
  baseURL: baseUrl,
  headers: {
    "X-Custom-Header": "foobar",
  },
  withCredentials: true,
});

makeRequest.interceptors.request.use(async (config) => {
  const access_token = await SecureStore.getItemAsync("accessToken");
  config.headers.Authorization = access_token ? access_token : "";
  return config;
});

export const signUpCall = `${baseUrl}/auth/signup`;

export const loginCall = `${baseUrl}/auth/login`;

export const updateUserCall = `${baseUrl}/user/edit`;
