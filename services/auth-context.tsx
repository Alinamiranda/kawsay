'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Language, QueryHistoryEntry, User } from '@/types'

interface RegisterInput {
  name: string
  email: string
  password: string
  location: string
  language: Language
}

interface AuthContextValue {
  user: User | null
  history: QueryHistoryEntry[]
  savedItems: string[]
  login: (email: string, password: string) => User
  register: (input: RegisterInput) => User
  logout: () => void
  addHistory: (question: string, answer: string) => void
  toggleSaved: (id: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

/**
 * In-memory session store. The shape mirrors the proposed database
 * (see database/schema.ts) so it can be swapped for a real auth
 * backend without changing consumers.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [history, setHistory] = useState<QueryHistoryEntry[]>([])
  const [savedItems, setSavedItems] = useState<string[]>([])

  const login = useCallback((email: string, _password: string): User => {
    const isAdmin = email.trim().toLowerCase().startsWith('admin')
    const nextUser: User = {
      id: 'u_' + Math.random().toString(36).slice(2, 9),
      name: isAdmin ? 'Administrador' : email.split('@')[0] || 'Usuario',
      email,
      language: 'es',
      location: 'Cusco, Perú',
      role: isAdmin ? 'admin' : 'user',
    }
    setUser(nextUser)
    setHistory([
      {
        id: 'q1',
        question: '¿Cómo saco mi DNI?',
        answer: 'Debes pagar la tasa, acudir a RENIEC y recoger tu documento.',
        date: '2026-02-02',
      },
      {
        id: 'q2',
        question: '¿Qué es el SIS?',
        answer: 'Es el Seguro Integral de Salud, gratuito para quien no tiene otro seguro.',
        date: '2026-02-05',
      },
    ])
    return nextUser
  }, [])

  const register = useCallback((input: RegisterInput): User => {
    const nextUser: User = {
      id: 'u_' + Math.random().toString(36).slice(2, 9),
      name: input.name,
      email: input.email,
      language: input.language,
      location: input.location,
      role: 'user',
    }
    setUser(nextUser)
    setHistory([])
    return nextUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setHistory([])
    setSavedItems([])
  }, [])

  const addHistory = useCallback((question: string, answer: string) => {
    setHistory((prev) => [
      {
        id: 'q_' + Math.random().toString(36).slice(2, 9),
        question,
        answer,
        date: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ])
  }, [])

  const toggleSaved = useCallback((id: string) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      history,
      savedItems,
      login,
      register,
      logout,
      addHistory,
      toggleSaved,
    }),
    [user, history, savedItems, login, register, logout, addHistory, toggleSaved],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
