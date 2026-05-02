// ═══════════════════════════════════════════════════════════
//  src/api/axios.js — Axios Base Configuration
//  Day 6: Axios setup with JWT auto-attach + 401 interceptor
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// ─── Request Interceptor: Attach JWT Token ─────────────────
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("projectiq_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor: Handle 401 Unauthorized ─────────
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("projectiq_token");
      localStorage.removeItem("projectiq_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
