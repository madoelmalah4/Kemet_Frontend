import { api } from '../baseApi'
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

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
    firstName: string
    lastName: string
    role: number // 0 for tourist, 1 for admin
}

export interface AuthResponse {
    user: User
    token: string // accessToken
    refreshToken: string
    expiresIn?: number
}

// Auth API
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Login
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/Auth/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response: any) => {
                // Backend shape: { success, data: { accessToken, refreshToken, user, expiresIn } }
                const data = response?.data || response

                // Store expiry time in localStorage
                const expiresIn = data?.expiresIn || 3600 // Default 1 hour (3600 seconds)
                const expiryTime = Date.now() + (expiresIn * 1000)
                if (typeof window !== 'undefined') {
                    localStorage.setItem('tokenExpiry', expiryTime.toString())
                }

                return {
                    user: {
                        id: data?.user?.id || data?.userId || '',
                        name: [data?.user?.firstName, data?.user?.lastName].filter(Boolean).join(' '),
                        email: data?.user?.email || '',
                        role: typeof data?.user?.role === 'number' ? (data.user.role === 1 ? 'admin' : 'tourist') : data?.user?.role,
                        emailVerified: data?.user?.emailVerified,
                        createdAt: '',
                        updatedAt: '',
                    } as User,
                    token: data?.accessToken,
                    refreshToken: data?.refreshToken,
                    expiresIn,
                } as AuthResponse
            },
        }),

        // Register
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (userData) => ({
                url: '/Auth/register',
                method: 'POST',
                body: userData,
            }),
            transformResponse: (response: any) => {
                // Backend shape: { success, message, data: { userId, email, firstName, lastName, role, accessToken, refreshToken, expiresIn } }
                const data = response?.data || response

                // Store expiry time in localStorage
                const expiresIn = data?.expiresIn || 3600
                const expiryTime = Date.now() + (expiresIn * 1000)
                if (typeof window !== 'undefined') {
                    localStorage.setItem('tokenExpiry', expiryTime.toString())
                }

                return {
                    user: {
                        id: data?.userId || '',
                        name: [data?.firstName, data?.lastName].filter(Boolean).join(' '),
                        email: data?.email || '',
                        role: typeof data?.role === 'number' ? (data.role === 1 ? 'admin' : 'tourist') : data?.role,
                        emailVerified: false,
                        createdAt: '',
                        updatedAt: '',
                    } as User,
                    token: data?.accessToken || '',
                    refreshToken: data?.refreshToken || '',
                    expiresIn,
                } as AuthResponse
            },
        }),

        // Refresh Token
        refreshToken: builder.mutation<AuthResponse, { refreshToken: string }>({
            query: ({ refreshToken }) => ({
                url: '/Auth/refresh',
                method: 'POST',
                body: { refreshToken },
            }),
            transformResponse: (response: any) => {
                const data = response?.data || response
                return {
                    user: undefined as any,
                    token: data?.accessToken,
                    refreshToken: data?.refreshToken,
                } as AuthResponse
            },
        }),

        // Logout
        logout: builder.mutation<void, { refreshToken: string }>({
            query: ({ refreshToken }) => ({
                url: '/Auth/logout',
                method: 'POST',
                body: { refreshToken },
            }),
        }),

        // Get Current User
        getCurrentUser: builder.query<User, void>({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),

        // Update Profile
        updateProfile: builder.mutation<User, Partial<User>>({
            query: (userData) => ({
                url: '/auth/profile',
                method: 'PUT',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),

        // Change Password
        changePassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
            query: ({ currentPassword, newPassword }) => ({
                url: '/Auth/change-password',
                method: 'POST',
                body: { currentPassword, newPassword },
            }),
        }),

        // Forgot Password
        forgotPassword: builder.mutation<void, { email: string }>({
            query: ({ email }) => ({
                url: '/Auth/forgot-password',
                method: 'POST',
                body: { email },
            }),
        }),

        // Reset Password
        resetPassword: builder.mutation<void, { email: string; otp: string; newPassword: string }>({
            query: ({ email, otp, newPassword }) => ({
                url: '/Auth/reset-password',
                method: 'POST',
                body: { email, otp, newPassword },
            }),
        }),

        // Update Preferences
        updatePreferences: builder.mutation<User, Partial<UserPreferences>>({
            query: (preferences) => ({
                url: '/auth/preferences',
                method: 'PUT',
                body: preferences,
            }),
            invalidatesTags: ['User'],
        }),

        // Verify Email
        verifyEmail: builder.mutation<{ success: boolean; message: string }, { email: string; otp: string }>({
            query: ({ email, otp }) => ({
                url: '/Auth/verify-email',
                method: 'POST',
                body: { email, otp },
            }),
        }),

        // Resend OTP
        resendOtp: builder.mutation<{ success: boolean; message: string }, { email: string }>({
            query: ({ email }) => ({
                url: '/Auth/resend-otp',
                method: 'POST',
                body: { email },
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshTokenMutation,
    useLogoutMutation,
    useGetCurrentUserQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useUpdatePreferencesMutation,
    useVerifyEmailMutation,
    useResendOtpMutation,
} = authApi

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
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('tokenExpiry')
            localStorage.removeItem('user')
        },
        tokenRefreshed: (state, action: PayloadAction<{ token: string; refreshToken: string; expiresIn?: number }>) => {
            const { token, refreshToken, expiresIn } = action.payload
            state.token = token
            state.refreshToken = refreshToken
            state.isAuthenticated = true

            // Update localStorage
            localStorage.setItem('token', token)
            localStorage.setItem('refreshToken', refreshToken)

            if (expiresIn) {
                const expiryTime = Date.now() + (expiresIn * 1000)
                localStorage.setItem('tokenExpiry', expiryTime.toString())
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
            localStorage.setItem('token', token)
            localStorage.setItem('refreshToken', refreshToken)
            localStorage.setItem('user', JSON.stringify(user))

            // Store expiry if provided
            if (expiresIn) {
                const expiryTime = Date.now() + (expiresIn * 1000)
                localStorage.setItem('tokenExpiry', expiryTime.toString())
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addMatcher(
                authApi.endpoints.login.matchPending,
                (state) => {
                    state.isLoading = true
                    state.error = null
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    authSlice.caseReducers.setCredentials(state, action)
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchRejected,
                (state, action) => {
                    state.isLoading = false
                    state.error = action.error?.message || 'Login failed'
                }
            )
            // Register
            .addMatcher(
                authApi.endpoints.register.matchPending,
                (state) => {
                    state.isLoading = true
                    state.error = null
                }
            )
            .addMatcher(
                authApi.endpoints.register.matchFulfilled,
                (state, action) => {
                    authSlice.caseReducers.setCredentials(state, action)
                }
            )
            .addMatcher(
                authApi.endpoints.register.matchRejected,
                (state, action) => {
                    state.isLoading = false
                    state.error = action.error?.message || 'Registration failed'
                }
            )
            // Get Current User
            .addMatcher(
                authApi.endpoints.getCurrentUser.matchFulfilled,
                (state, action) => {
                    state.user = action.payload
                    state.isAuthenticated = true
                }
            )
            // Logout
            .addMatcher(
                authApi.endpoints.logout.matchFulfilled,
                (state) => {
                    authSlice.caseReducers.logout(state)
                }
            )
    },
})

export const { setLoading, setError, clearError, logout: logoutAction, setCredentials, tokenRefreshed } = authSlice.actions

export default authSlice.reducer

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth
export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading
export const selectError = (state: { auth: AuthState }) => state.auth.error

// Hooks for role-based access
// This hook is defined separately to avoid circular dependencies
export const useAuth = () => {
    // This will be defined in a separate hooks file to avoid circular imports
    throw new Error('useAuth hook should be imported from @/store/hooks')
}
