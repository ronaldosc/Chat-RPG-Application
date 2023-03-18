import axios from 'axios';

export const apiJSON = axios.create({
  baseURL: 'http://localhost:3030',
});

export const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});
