// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para debugging
api.interceptors.request.use(
  config => {
    console.log('Request:', {
      method: config.method,
      url: config.url,
      data: config.data
    });
    return config;
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default api;