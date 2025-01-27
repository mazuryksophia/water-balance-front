import axios from 'axios';
import { logOutReducer, setToken } from '../redux/auth/slice';

const BASE_URL = import.meta.env.VITE_API_URL;

let store;
export const injectStore = (_store) => {
  store = _store;
};

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let subscribers = [];

const onRefreshed = (token) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

export const fetchRefreshToken = async () => {
  const { data } = await axios.post(
    `${BASE_URL}/users/refresh`,
    {},
    { withCredentials: true }
  );
  return data;
};

instance.interceptors.request.use(
  (config) => {
    if (store) {
      const state = store.getState();
      const token = state?.auth?.token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribers.push((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { token } = await fetchRefreshToken();
        store.dispatch(setToken(token));
        isRefreshing = false;

        onRefreshed(token);

        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return instance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        store.dispatch(logOutReducer());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
