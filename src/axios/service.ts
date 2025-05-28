import axios from 'axios';

// Create base Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // your API base
  withCredentials: true, // important for sending cookies like refresh token
   headers: {
    'Content-Type': 'application/json',
  },
});

// Store access token in memory
let accessToken: string | null = null;

// Set access token
export const setAccessToken = (token: string) => {
  accessToken = token;
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry // avoid infinite loop
    ) {
      originalRequest._retry = true;

      try {
        // Hit refresh token endpoint
        const response = await axios.post(
          'http://localhost:5000/api/auth/refresh-token',
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);

        // Retry original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        // Optionally: redirect to login or logout user
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
