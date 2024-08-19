import axios from 'axios';

// const baseURL = 'http://127.0.0.1:8000/api'; // Replace with your server URL
// const baseURL = 'https://hrm.cims.viewdemo.xyz/api'; // Replace with your server URL

const baseURL = 'https://hrm.cims.viewdemo.xyz/api'; // Replace with your server URL

const axios_client = axios.create({
  baseURL,
});

axios_client.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ` + localStorage.getItem('authToken')
  return config;
})

export default axios_client;
