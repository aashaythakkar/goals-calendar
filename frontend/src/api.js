import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
console.log ("API URL: " + API_URL);
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const createUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/users`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getGoals = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/goals`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/categories`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching Cateogories:", error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/api/tasks`, taskData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const createGoal = async (goalData) => {
  try {
    const response = await axios.post(`${API_URL}/api/goals`, goalData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error creating goal:", error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${API_URL}/api/categories`, categoryData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};