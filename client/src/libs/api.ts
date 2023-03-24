import axios from 'axios';

const host = window.location.hostname;

export const apiJSON = axios.create({
  baseURL: 'http://localhost:3030',
});

export const api = axios.create({
  baseURL: `https://${host}:5000`,
  withCredentials: true,
});
