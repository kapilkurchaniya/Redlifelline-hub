'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  userType: string
  userEmail: string
  userName: string
  login: (email: string, password: string, userType: string, userName?: string) => Promise<void>
  logout: () => void
  register: (data: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')

  const login = async (email: string, password: string, type: string, userName?: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsLoggedIn(true)
    setUserType(type)
    setUserEmail(email)
    setUserName(userName || email.split('@')[0])
    localStorage.setItem('user', JSON.stringify({ 
      email, 
      type,
      userName: userName || email.split('@')[0]
    }))
    localStorage.setItem('username', userName || email.split('@')[0])
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserType('')
    setUserEmail('')
    setUserName('')
    localStorage.removeItem('user')
    localStorage.removeItem('username')
  }

  const register = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    const displayName = data.fullName || data.name || data.email.split('@')[0]
    setIsLoggedIn(true)
    setUserType('donor')
    setUserEmail(data.email)
    setUserName(displayName)
    localStorage.setItem('user', JSON.stringify({ 
      email: data.email, 
      type: 'donor', 
      userName: displayName,
      ...data 
    }))
    localStorage.setItem('username', displayName)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, userEmail, userName, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
