import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  localStorage.setItem('token', response.data.token);
};

export const register = async (nombre, email, password) => {
  await axios.post(`${API_URL}/auth/register`, { nombre, email, password });
};

export const getUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const response = await axios.get(`${API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};