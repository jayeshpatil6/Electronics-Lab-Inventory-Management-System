import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const authAPI = {
  login: async (data: { email: string; password: string }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { data: { user: { id: "1", name: "User", email: data.email, role: "User" }, token: "mock-token" } }
  },

  register: async (data: { name: string; email: string; password: string; role: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { data: { user: { id: "1", ...data }, token: "mock-token" } }
  },
}

// Components API
export const componentsAPI = {
  getComponents: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { data: [] }
  },

  addComponent: async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { data: { id: Date.now().toString(), ...data } }
  },

  updateComponent: async (id: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { data: { id, ...data } }
  },

  deleteComponent: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { data: { success: true } }
  },

  getComponent: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { data: { id } }
  },
}

// Transactions API
export const transactionsAPI = {
  inwardStock: async (id: string, data: { quantity: number; reason: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { data: { success: true } }
  },

  outwardStock: async (id: string, data: { quantity: number; reason: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { data: { success: true } }
  },
}

// Dashboard API
export const dashboardAPI = {
  getDashboardData: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      data: {
        totalComponents: 150,
        lowStockItems: 12,
        recentTransactions: 45,
        oldStockItems: 8,
      },
    }
  },
}

// Notifications API
export const notificationsAPI = {
  getNotifications: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { data: [] }
  },
}

// Users API
export const usersAPI = {
  getUsers: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { data: [] }
  },

  addUser: async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { data: { id: Date.now().toString(), ...data } }
  },

  updateUser: async (id: string, data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { data: { id, ...data } }
  },

  deleteUser: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { data: { success: true } }
  },
}
