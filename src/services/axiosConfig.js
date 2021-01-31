import axios from 'axios';
let baseURL = process.env.BASE_URL ? process.env.BASE_URL : 'https://questence.tqfe.net/api/v1/';

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('Authorization');
    const refreshToken = localStorage.getItem('X-Refresh-Token');
    if (token && refreshToken) {
      config.headers['Authorization'] = token;
      config.headers['X-Refresh-Token'] = refreshToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
