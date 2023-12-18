import axios from 'axios'

const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

const api = axios.create({
    baseURL: 'http://127.0.0.1:3301/api'
})

api.interceptors.request.use(
    config => {
      // Adicione o token ao cabeçalho da requisição
      const token = getCookie('token');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

export default api;