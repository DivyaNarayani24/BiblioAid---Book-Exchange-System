import axios from "axios";

const API_BASE = "http://localhost:2222/api";

// User APIs
export const addUser = async (user) => {
  const res = await axios.post(`${API_BASE}/users/register`, user);
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/users/login`, { email, password });
  return res.data;
};

export const getUsers = async () => {
  const res = await axios.get(`${API_BASE}/users`);
  return res.data;
};

export const getUserByEmail = async (email) => {
  const res = await axios.get(`${API_BASE}/users/email/${email}`);
  return res.data;
};

// Book APIs
export const addBook = async (book) => {
  const res = await axios.post(`${API_BASE}/books`, book);
  return res.data;
};

export const getBooks = async () => {
  const res = await axios.get(`${API_BASE}/books`);
  return res.data;
};

// Fixed: Changed from /search/${query} to /search?title=${query}
export const searchBooks = async (query) => {
  const res = await axios.get(`${API_BASE}/books/search?title=${query}`);
  return res.data;
};

export const getBooksByUser = async (userId) => {
  const res = await axios.get(`${API_BASE}/books/user/${userId}`);
  return res.data;
};

// Request APIs
export const addRequest = async (request) => {
  const res = await axios.post(`${API_BASE}/requests`, request);
  return res.data;
};

export const getRequests = async () => {
  const res = await axios.get(`${API_BASE}/requests`);
  return res.data;
};

export const getRequestsByUser = async (userId) => {
  const res = await axios.get(`${API_BASE}/requests/user/${userId}`);
  return res.data;
};