import { useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type CustomHeaders = AxiosRequestConfig["headers"];

interface ApiHooks {
  get: (
    url: string,
    customHeaders?: CustomHeaders
  ) => Promise<AxiosResponse<any>>;
  post: <T>(
    url: string,
    requestData: T,
    customHeaders?: CustomHeaders
  ) => Promise<AxiosResponse<T>>;
  patch: <T>(
    url: string,
    requestData: T,
    customHeaders?: CustomHeaders
  ) => Promise<AxiosResponse<T>>;
  del: <T>(
    url: string,
    requestData?: T,
    customHeaders?: CustomHeaders
  ) => Promise<AxiosResponse<T>>;
}

const useApi = (): ApiHooks => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 6000
  });

  api.interceptors.request.use(async (config) => {
    const token = await localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
        return Promise.reject(
          new Error("Request timeout. Please try again later.")
        );
      }
      if (error.response) {
        // const { status } = error.response;
        // if (status && status === 401) {
        //   auth.logout();
        //   logout();
        // }
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  const request = useCallback(
    async <T>(fetchFunc: () => Promise<AxiosResponse<T>>) => {
      try {
        const funcResponse = await fetchFunc();
        return funcResponse;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    []
  );

  const get = useCallback(
    (url: string, customHeaders?: CustomHeaders) =>
      request(() => api.get(url, { headers: customHeaders })),
    [request, api]
  );

  const post = useCallback(
    <T>(url: string, requestData: T, customHeaders?: CustomHeaders) =>
      request(() => api.post(url, requestData, { headers: customHeaders })),
    [request, api]
  );

  const patch = useCallback(
    <T>(url: string, requestData: T, customHeaders?: CustomHeaders) =>
      request(() => api.patch(url, requestData, { headers: customHeaders })),
    [request, api]
  );

  const del = useCallback(
    <T>(url: string, requestData?: T, customHeaders?: CustomHeaders) =>
      request(() =>
        api.delete(url, { headers: customHeaders, data: requestData })
      ),
    [request, api]
  );

  return {
    get,
    post,
    patch,
    del
  };
};

export default useApi;
