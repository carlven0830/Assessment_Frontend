import axiosInstance from "../api/axios";

const httpService = {
  get: <T>(url: string, params?: object) =>
    axiosInstance.get<T>(url, { params }).then((res) => res.data),

  post: <T>(url: string, data?: object) =>
    axiosInstance.post<T>(url, data).then((res) => res.data),

  put: <T>(url: string, data?: object) =>
    axiosInstance.put<T>(url, data).then((res) => res.data),

  delete: <T>(url: string) =>
    axiosInstance.delete<T>(url).then((res) => res.data),
};

export default httpService;
