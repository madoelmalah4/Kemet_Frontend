"use client"

import React, { createContext, useContext, useEffect } from "react"
import { User } from "@/types"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } from "@/store/features/auth/authApi"
import { logoutAction } from "@/store/features/auth/authSlice"

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    isAuthenticated: boolean
    isAdmin: boolean
    isTourist: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const [loginMutation] = useLoginMutation()
    const [logoutMutation] = useLogoutMutation()
    const [refreshMutation] = useRefreshTokenMutation()

    // Silent refresh on mount if refreshToken exists but no access token
    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        const rt = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null
        if (!token && rt) {
            refreshMutation({ refreshToken: rt }).catch(() => {
                // ignore; user will be treated as logged out
            })
        }
    }, [refreshMutation])

    // Check for token expiry periodically - SMART CHECK
    useEffect(() => {
        const checkExpiry = async () => {
            if (typeof window === 'undefined') return

            const expiryStr = localStorage.getItem('tokenExpiry')
            const refreshToken = localStorage.getItem('refreshToken')

            if (!expiryStr || !refreshToken) return

            const expiry = parseInt(expiryStr, 10)
            const now = Date.now()

            // If token is expired or about to expire (within 2 mins)
            if (now >= expiry - (2 * 60 * 1000)) {
                console.log('Token expiring soon or expired, attempting refresh...')
                try {
                    await refreshMutation({ refreshToken }).unwrap()
                    console.log('Periodic refresh successful')
                } catch (error) {
                    console.log('Periodic refresh failed, session truly expired')
                    // Only logout if refresh fails
                    logout()
                }
            }
        }

        // Check immediately
        checkExpiry()

        // Then check every minute
        const interval = setInterval(checkExpiry, 60 * 1000)

        return () => clearInterval(interval)
    }, [refreshMutation])

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            await loginMutation({ email, password }).unwrap()
            return true
        } catch {
            return false
        }
    }

    const logout = async () => {
        // 1. Clear Redux State IMMEDIATELY (Updates Navbar)
        dispatch(logoutAction())

        // 2. Clear Local Storage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('tokenExpiry')
            localStorage.removeItem('user')
        }

        // 3. Call API to invalidate on server (best effort)
        try {
            const rt = auth.refreshToken || (typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null)
            if (rt) {
                await logoutMutation({ refreshToken: rt }).unwrap()
            }
        } catch { /* ignore */ }

        // 4. Redirect
        if (typeof window !== 'undefined') {
            window.location.href = '/login'
        }
    }

    const value: AuthContextType = {
        user: auth.user as User | null,
        login,
        logout,
        isAuthenticated: auth.isAuthenticated,
        isAdmin: auth.user?.role === "admin",
        isTourist: auth.user?.role === "tourist",
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
