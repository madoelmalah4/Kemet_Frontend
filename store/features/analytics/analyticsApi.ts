import { api } from '../baseApi'

// Types
export interface UserStats {
    total: number
    active: number
    growth: number
    newThisMonth: number
    retention: number
}

export interface DestinationStats {
    total: number
    featured: number
    averageRating: number
    totalReviews: number
    mostViewed: string
    topRated: string
}

export interface BookingStats {
    total: number
    thisMonth: number
    revenue: number
    averageBookingValue: number
    cancellationRate: number
}

export interface SystemHealth {
    uptime: number
    responseTime: number
    errorRate: number
    activeConnections: number
    storageUsed: number
    storageLimit: number
}

export interface AnalyticsData {
    userStats: UserStats
    destinationStats: DestinationStats
    bookingStats: BookingStats
    systemHealth: SystemHealth
    featureUsage: {
        [key: string]: number
    }
}

export interface TimeSeriesData {
    date: string
    users: number
    bookings: number
    revenue: number
    pageViews: number
}

export interface TopDestination {
    id: string
    name: string
    views: number
    bookings: number
    revenue: number
    rating: number
    trend: 'up' | 'down' | 'stable'
}

export interface UserActivity {
    userId: string
    userName: string
    lastActive: string
    sessions: number
    pagesViewed: number
    bookings: number
    status: 'active' | 'inactive' | 'new'
}

// Analytics API
export const analyticsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Get dashboard analytics
        getDashboardAnalytics: builder.query<AnalyticsData, void>({
            query: () => '/analytics/dashboard',
            providesTags: ['Analytics'],
        }),

        // Get user growth data
        getUserGrowth: builder.query<TimeSeriesData[], {
            startDate: string
            endDate: string
            granularity?: 'day' | 'week' | 'month'
        }>({
            query: ({ startDate, endDate, granularity = 'day' }) => ({
                url: '/analytics/users/growth',
                params: { startDate, endDate, granularity },
            }),
            providesTags: ['Analytics'],
        }),

        // Get destination views data
        getDestinationViews: builder.query<TimeSeriesData[], {
            startDate: string
            endDate: string
        }>({
            query: ({ startDate, endDate }) => ({
                url: '/analytics/destinations/views',
                params: { startDate, endDate },
            }),
            providesTags: ['Analytics'],
        }),

        // Get revenue analytics
        getRevenueAnalytics: builder.query<TimeSeriesData[], {
            startDate: string
            endDate: string
            groupBy?: 'day' | 'week' | 'month'
        }>({
            query: ({ startDate, endDate, groupBy = 'day' }) => ({
                url: '/analytics/revenue',
                params: { startDate, endDate, groupBy },
            }),
            providesTags: ['Analytics'],
        }),

        // Get top destinations
        getTopDestinations: builder.query<TopDestination[], {
            limit?: number
            sortBy?: 'views' | 'bookings' | 'revenue' | 'rating'
            period?: 'week' | 'month' | 'quarter' | 'year'
        }>({
            query: ({ limit = 10, sortBy = 'views', period = 'month' }) => ({
                url: '/analytics/destinations/top',
                params: { limit, sortBy, period },
            }),
            providesTags: ['Analytics'],
        }),

        // Get user activity
        getUserActivity: builder.query<UserActivity[], {
            limit?: number
            status?: 'active' | 'inactive' | 'new'
            sortBy?: 'lastActive' | 'sessions' | 'pagesViewed' | 'bookings'
        }>({
            query: ({ limit = 50, status, sortBy = 'lastActive' }) => ({
                url: '/analytics/users/activity',
                params: { limit, status, sortBy },
            }),
            providesTags: ['Analytics'],
        }),

        // Get feature usage statistics
        getFeatureUsage: builder.query<{ [key: string]: number }, {
            period?: 'week' | 'month' | 'quarter'
        }>({
            query: ({ period = 'month' }) => ({
                url: '/analytics/features/usage',
                params: { period },
            }),
            providesTags: ['Analytics'],
        }),

        // Get system performance metrics
        getSystemPerformance: builder.query<SystemHealth, void>({
            query: () => '/analytics/system/performance',
            providesTags: ['Analytics'],
        }),

        // Get booking analytics
        getBookingAnalytics: builder.query<{
            totalBookings: number
            bookingsByStatus: { [key: string]: number }
            bookingsByPeriod: TimeSeriesData[]
            averageBookingValue: number
            cancellationRate: number
            popularDestinations: TopDestination[]
        }, {
            startDate: string
            endDate: string
            groupBy?: 'day' | 'week' | 'month'
        }>({
            query: ({ startDate, endDate, groupBy = 'day' }) => ({
                url: '/analytics/bookings',
                params: { startDate, endDate, groupBy },
            }),
            providesTags: ['Analytics'],
        }),

        // Get search analytics
        getSearchAnalytics: builder.query<{
            totalSearches: number
            popularQueries: Array<{
                query: string
                count: number
                results: number
            }>
            noResultQueries: Array<{
                query: string
                count: number
            }>
            searchTrends: TimeSeriesData[]
        }, {
            startDate: string
            endDate: string
        }>({
            query: ({ startDate, endDate }) => ({
                url: '/analytics/search',
                params: { startDate, endDate },
            }),
            providesTags: ['Analytics'],
        }),

        // Get conversion funnel analytics
        getConversionFunnel: builder.query<{
            step: string
            users: number
            conversionRate: number
            dropOffRate: number
        }[], {
            startDate?: string
            endDate?: string
        }>({
            query: ({ startDate, endDate }) => ({
                url: '/analytics/conversion-funnel',
                params: { startDate, endDate },
            }),
            providesTags: ['Analytics'],
        }),

        // Get geographic analytics
        getGeographicAnalytics: builder.query<Array<{
            country: string
            region: string
            users: number
            sessions: number
            bookings: number
            revenue: number
        }>, {
            startDate?: string
            endDate?: string
            level?: 'country' | 'region' | 'city'
        }>({
            query: ({ startDate, endDate, level = 'country' }) => ({
                url: '/analytics/geographic',
                params: { startDate, endDate, level },
            }),
            providesTags: ['Analytics'],
        }),

        // Export analytics report
        exportAnalyticsReport: builder.mutation<Blob, {
            reportType: 'dashboard' | 'users' | 'destinations' | 'revenue' | 'bookings'
            format: 'pdf' | 'excel' | 'csv'
            filters?: {
                startDate?: string
                endDate?: string
                [key: string]: any
            }
        }>({
            query: ({ reportType, format, filters }) => ({
                url: `/analytics/export/${reportType}`,
                method: 'POST',
                body: { format, ...filters },
                responseHandler: (response: any) => response.blob(),
            }),
        }),

        // Get real-time metrics
        getRealTimeMetrics: builder.query<{
            activeUsers: number
            currentSessions: number
            onlineBookings: number
            serverLoad: number
            responseTime: number
        }, void>({
            query: () => '/analytics/real-time',
            providesTags: ['Analytics'],
        }),

        // Track custom event
        trackEvent: builder.mutation<void, {
            event: string
            properties?: { [key: string]: any }
            userId?: string
        }>({
            query: ({ event, properties, userId }) => ({
                url: '/analytics/events',
                method: 'POST',
                body: { event, properties, userId },
            }),
        }),
    }),
})

export const {
    useGetDashboardAnalyticsQuery,
    useGetUserGrowthQuery,
    useGetDestinationViewsQuery,
    useGetRevenueAnalyticsQuery,
    useGetTopDestinationsQuery,
    useGetUserActivityQuery,
    useGetFeatureUsageQuery,
    useGetSystemPerformanceQuery,
    useGetBookingAnalyticsQuery,
    useGetSearchAnalyticsQuery,
    useGetConversionFunnelQuery,
    useGetGeographicAnalyticsQuery,
    useExportAnalyticsReportMutation,
    useGetRealTimeMetricsQuery,
    useTrackEventMutation,
} = analyticsApi
