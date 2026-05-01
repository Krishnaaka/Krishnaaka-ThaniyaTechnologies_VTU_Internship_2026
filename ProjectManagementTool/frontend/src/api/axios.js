// ═══════════════════════════════════════════════════════════
//  src/api/axios.js — Axios Base Configuration
//  Day 1: Central API client — all API calls go through here
//  Project: ProjectIQ Management Tool
//  Author:  Krishna | VTU Internship 2026
// ═══════════════════════════════════════════════════════════

import axios from "axios";

// ─── Create Axios Instance ───────────────────────────────────
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor — Attach JWT Token ──────────────────
//  Reads token from localStorage and adds to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor — Handle Auth Errors ───────────────
//  If 401 (Unauthorized) → clear storage and redirect to login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
