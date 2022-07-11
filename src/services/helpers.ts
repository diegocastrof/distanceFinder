import axios from "axios";
import { API_URL } from "env";

export const createHttpRequest = (
  baseURL = API_URL,
  contentType = "application/json",
) => {
  const headers = { "Content-Type": contentType };

  return axios.create({
    baseURL,
    headers,
  });
};
