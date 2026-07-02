import { createContext, useContext, useState, useCallback } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('dhebronix_admin_token'))
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem('dhebronix_admin_token'))

  const login = useCallback(async (password) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:10000'
    const res = await axios.post(`${apiUrl}/api/admin/login`, { password })
    const { token } = res.data
    localStorage.setItem('dhebronix_admin_token', token)
    setToken(token)
    setIsAdmin(true)
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('dhebronix_admin_token')
    setToken(null)
    setIsAdmin(false)
  }, [])

  const getAuthHeaders = useCallback(() => {
    return token ? { Authorization: `Bearer ${token}` } : {}
  }, [token])

  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout, getAuthHeaders }}>
      {children}
    </AuthContext.Provider>
  )
}