import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://wallet.b.goit.study/api",
});

//Token'a header'a ekleyen yardımcı fonksiyon
export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export default axiosInstance;
