import { AnalyticsData } from "@/types"

export const mockAnalytics: AnalyticsData = {
    userStats: {
        total: 15420,
        active: 3240,
        new: 580,
        growth: 12.5
    },
    destinationStats: {
        mostVisited: [
            { name: "Pyramids of Giza", visits: 8920 },
            { name: "Luxor Temple", visits: 6340 },
            { name: "Red Sea Resorts", visits: 5680 },
            { name: "Alexandria", visits: 3210 },
            { name: "Aswan & Abu Simbel", visits: 2890 }
        ],
        totalViews: 45680
    },
    featureUsage: {
        chatbot: 12340,
        vrTours: 8920,
        taxiEstimator: 6780,
        translator: 5430
    },
    systemHealth: {
        status: "healthy",
        uptime: 99.8,
        responseTime: 145
    }
}

// Time series data for charts
export const userGrowthData = [
    { month: "Jul", users: 8200 },
    { month: "Aug", users: 9100 },
    { month: "Sep", users: 10300 },
    { month: "Oct", users: 11800 },
    { month: "Nov", users: 13200 },
    { month: "Dec", users: 14100 },
    { month: "Jan", users: 15420 }
]

export const destinationViewsData = [
    { name: "Pyramids", views: 8920 },
    { name: "Luxor", views: 6340 },
    { name: "Red Sea", views: 5680 },
    { name: "Alexandria", views: 3210 },
    { name: "Aswan", views: 2890 }
]

export const featureUsageData = [
    { feature: "Chatbot", usage: 12340 },
    { feature: "VR Tours", usage: 8920 },
    { feature: "Taxi Estimator", usage: 6780 },
    { feature: "Translator", usage: 5430 }
]

export const dailyActivityData = [
    { day: "Mon", activities: 1240 },
    { day: "Tue", activities: 1580 },
    { day: "Wed", activities: 1420 },
    { day: "Thu", activities: 1680 },
    { day: "Fri", activities: 2100 },
    { day: "Sat", activities: 2340 },
    { day: "Sun", activities: 1980 }
]
