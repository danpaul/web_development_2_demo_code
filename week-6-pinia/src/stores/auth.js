import { defineStore } from "pinia";
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async fetchUser() {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get(`${API_ENDPOINTS.auth}/me`);
        this.user = response.data.user;
        return response;
      } catch (error) {
        this.error =
          error.response?.data?.message || "Failed to fetch user data";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async register(credentials) {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.post(
          `${API_ENDPOINTS.auth}/register`,
          credentials
        );
        this.user = response.data.user;
        this.token = response.data.token;
        // Store token in localStorage
        localStorage.setItem("token", this.token);
        // Set default Authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || "Registration failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async login(credentials) {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.post(
          `${API_ENDPOINTS.auth}/login`,
          credentials
        );
        this.user = response.data.user;
        this.token = response.data.token;
        // Store token in localStorage
        localStorage.setItem("token", this.token);
        // Set default Authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || "Login failed";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },

    // Initialize auth state from localStorage
    async initializeAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          await this.fetchUser();
        } catch (error) {
          // If fetching user fails, token might be invalid
          this.logout();
        }
      }
    },
  },
});
