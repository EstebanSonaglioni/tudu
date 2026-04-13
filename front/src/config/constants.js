const API_BASE_URL = "http://localhost:8000";

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login/`,
  REGISTER: `${API_BASE_URL}/api/users/register/`,
  TASKS: `${API_BASE_URL}/api/tasks/`,
  COMPLETE_TODO: (id) =>  `${API_BASE_URL}/api/todos/complete/${id}/`,
  GET_TODOS: `${API_BASE_URL}/api/todos/get/`,
  TASK_DETAIL: (id) => `${API_BASE_URL}/api/tasks/${id}/`,
  CREATE_TODO: `${API_BASE_URL}/api/todos/create/`,
  DELETE_TODO: (id) => `${API_BASE_URL}/api/todos/delete/${id}/`,
};

export const STORAGE_KEYS = {
  TOKEN: "token",
  USER_DATA: "user_info",
};

export const THEME_COLORS = {
  PRIMARY: "#9333ea", 
  SECONDARY: "#2563eb",
};