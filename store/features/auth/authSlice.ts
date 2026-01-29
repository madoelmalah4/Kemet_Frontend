import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Types
export interface User {
    id: string
    name: string
    email: string
    role: 'admin' | 'tourist'
    emailVerified?: boolean
    avatar?: string
    preferences?: UserPreferences
    createdAt: string
    updatedAt: string
}

export interface UserPreferences {
    language: string
    currency: string
    notifications: boolean
    theme: 'light' | 'dark'
}

export interface AuthState {
    user: User | null
    token: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
}

export interface AuthResponse {
    user: User
    token: string // accessToken
    refreshToken: string
    expiresIn?: number
}

// Helper to safely parse JSON from localStorage causes no errors if invalid
const safeJsonParse = (key: string) => {
    if (typeof window === 'undefined') return null
    try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    } catch {
        return null
    }
}

// Auth Slice
const initialState: AuthState = {
    user: safeJsonParse('user'),
    token: typeof window === 'undefined' ? null : localStorage.getItem('token'),
    refreshToken: typeof window === 'undefined' ? null : localStorage.getItem('refreshToken'),
    isAuthenticated: typeof window === 'undefined' ? false : !!localStorage.getItem('token'),
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        clearError: (state) => {
            state.error = null
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.refreshToken = null
            state.isAuthenticated = false
            state.error = null
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('tokenExpiry')
                localStorage.removeItem('user')
            }
        },
        tokenRefreshed: (state, action: PayloadAction<{ token: string; refreshToken: string; expiresIn?: number }>) => {
            const { token, refreshToken, expiresIn } = action.payload
            state.token = token
            state.refreshToken = refreshToken
            state.isAuthenticated = true

            // Update localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', token)
                localStorage.setItem('refreshToken', refreshToken)

                if (expiresIn) {
                    const expiryTime = Date.now() + (expiresIn * 1000)
                    localStorage.setItem('tokenExpiry', expiryTime.toString())
                }
            }
        },
        setCredentials: (state, action: PayloadAction<AuthResponse>) => {
            const { user, token, refreshToken, expiresIn } = action.payload
            state.user = user
            state.token = token
            state.refreshToken = refreshToken
            state.isAuthenticated = true
            state.error = null
            state.isLoading = false

            // Store tokens in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', token)
                localStorage.setItem('refreshToken', refreshToken)
                localStorage.setItem('user', JSON.stringify(user))

                // Store expiry if provided
                if (expiresIn) {
                    const expiryTime = Date.now() + (expiresIn * 1000)
                    localStorage.setItem('tokenExpiry', expiryTime.toString())
                }
            }
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuthenticated = true
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(action.payload))
            }
        }
    },
})

export const { setLoading, setError, clearError, logout: logoutAction, setCredentials, tokenRefreshed, setUser } = authSlice.actions

export default authSlice.reducer

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth
export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading
export const selectError = (state: { auth: AuthState }) => state.auth.error
