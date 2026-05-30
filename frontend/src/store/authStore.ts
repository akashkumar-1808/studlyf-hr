import { create } from 'zustand'
import { fetchAPI } from '@/lib/api'

interface User {
  id: string
  email: string
  fullName: string
  companyName: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  
  checkAuth: async () => {
    try {
      set({ isLoading: true })
      const data = await fetchAPI('/api/auth/me')
      set({ user: data, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },
  
  logout: async () => {
    try {
      await fetchAPI('/api/auth/logout', { method: 'POST' })
      set({ user: null, isAuthenticated: false })
    } catch (error) {
      console.error('Logout failed', error)
    }
  }
}))
