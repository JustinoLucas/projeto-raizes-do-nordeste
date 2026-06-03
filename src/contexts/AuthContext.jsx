import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import usersData from '../data/users.json'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('currentUser', null)

  function login(email, password) {
    const found = usersData.find(
      (u) => u.email === email && u.password === password
    )
    if (found) {
      const { password: _, ...safeUser } = found
      setUser(safeUser)
      return { success: true }
    }
    return { success: false, message: 'E-mail ou senha inválidos.' }
  }

  function register(userData) {
    const exists = usersData.find((u) => u.email === userData.email)
    if (exists) {
      return { success: false, message: 'E-mail já cadastrado.' }
    }
    const newUser = {
      id: `user-${Date.now()}`,
      ...userData,
      loyaltyStamps: 0,
      totalOrders: 0,
      lgpdConsent: false,
      lgpdConsentDate: null,
    }
    setUser(newUser)
    return { success: true }
  }

  function logout() {
    setUser(null)
  }

  function updateUser(updates) {
    setUser((prev) => ({ ...prev, ...updates }))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
