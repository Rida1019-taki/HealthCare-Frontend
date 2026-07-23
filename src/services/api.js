import axios from "axios";

const api = axios.create({
  baseURL: "https://healthcare-syst-me-de-gestion-m-dicale-9b6h.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
    (response) => {
      return response;
    },

    (error) => {

      const status = error.response?.status;

      switch (status) {

        case 400:
          console.log("400 - Bad Request");
          break;

        case 401:
          console.log("401 - Unauthorized");

          localStorage.clear();

          window.location.href = "/login";
          break;

        case 403:
          console.log("403 - Forbidden");
          break;

        case 404:
          console.log("404 - Not Found");
          break;

        case 500:
          console.log("500 - Internal Server Error");
          break;

        default:
          console.log("Une erreur est survenue");
      }

      return Promise.reject(error);
    }
);

export default api;