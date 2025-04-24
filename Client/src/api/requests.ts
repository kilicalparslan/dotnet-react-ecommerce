import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5057/api/";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500:
        toast.error(data.title);
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const queries = {
  get: (url: string) => axios.get(url).then((res: AxiosResponse) => res.data),
  post: (url: string, body: {}) =>
    axios.post(url, body).then((res: AxiosResponse) => res.data),
  put: (url: string, body: {}) =>
    axios.put(url, body).then((res: AxiosResponse) => res.data),
  delete: (url: string) =>
    axios.delete(url).then((res: AxiosResponse) => res.data),
};

const errors = {
  get400Error: () => queries.get("/error/bad-request"),
  get401Error: () => queries.get("/error/unauthorized"),
  get404Error: () => queries.get("/error/not-found"),
  get500Error: () => queries.get("/error/server-error"),
  getValidationError: () => queries.get("/error/validation-error"),
};

const catalog = {
  list: () => queries.get("products"),
  details: (id: number) => queries.get(`products/${id}`),
};

const requests = {
  catalog: catalog,
  errors: errors,
};

export default requests;
