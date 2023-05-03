import axios, { AxiosRequestHeaders } from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use(async (config) => {
  const header = {
    Accept: 'application/json',
  } as AxiosRequestHeaders;
  config.headers = header;
  return config;
});

export default http;
