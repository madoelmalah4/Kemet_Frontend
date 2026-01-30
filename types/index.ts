// User types
export interface User {
    id: string
    email: string
    name: string
    role: "tourist" | "admin"
    avatar?: string
    preferences?: TouristPreferences
    createdAt: string
}

export interface TouristPreferences {
    interests: string[]
    budget: "budget" | "moderate" | "luxury"
    travelDates: {
        start: string
        end: string
    }
    groupSize: number
    travelStyle: string[]
    accessibility?: string[]
}

// Destination types
export interface Destination {
    id: string
    name: string
    city: string
    description: string
    imageUrl: string
    vrUrlImage: string
    estimatedPrice?: number
    fromWorkingHours?: string
    endWorkingHours?: string
}

export interface Activity {
    id: string
    name: string
    description: string
    duration: string
    price: number
    category: string
    included: boolean
}

// Travel Plan types
export interface TravelPlan {
    id: string
    userId: string
    name: string
    startDate: string
    endDate: string
    days: TravelDay[]
    budget: number
    status: "draft" | "confirmed" | "completed"
    createdAt: string
    updatedAt: string
}

export interface TravelDay {
    dayNumber: number
    date: string
    activities: PlannedActivity[]
    accommodation?: {
        name: string
        location: string
        checkIn: string
        checkOut: string
    }
    notes?: string
}

export interface PlannedActivity {
    id: string
    destinationId: string
    activityId: string
    startTime: string
    endTime: string
    notes?: string
}

// VR Tour types
export interface VRTour {
    id: string
    destinationId: string
    title: string
    description: string
    url: string
    thumbnail: string
    duration: string
    views: number
    createdAt: string
}

// Chat types
export interface ChatMessage {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: string
}

export interface ChatSession {
    id: string
    userId: string
    messages: ChatMessage[]
    createdAt: string
    updatedAt: string
}

// Taxi Estimator types
export interface TaxiLocation {
    id: string
    name: string
    type: "airport" | "hotel" | "attraction" | "city"
    coordinates: {
        lat: number
        lng: number
    }
}

export interface TaxiFareEstimate {
    from: string
    to: string
    distance: number
    duration: string
    estimatedFare: {
        min: number
        max: number
        currency: string
    }
    fareBreakdown: {
        baseFare: number
        perKm: number
        total: number
    }
}

// Translation types
export interface TranslationPhrase {
    id: string
    english: string
    arabic: string
    category: string
    pronunciation?: string
}

// Analytics types
export interface AnalyticsData {
    userStats: {
        total: number
        active: number
        new: number
        growth: number
    }
    destinationStats: {
        mostVisited: {
            name: string
            visits: number
        }[]
        totalViews: number
    }
    featureUsage: {
        chatbot: number
        vrTours: number
        taxiEstimator: number
        translator: number
    }
    systemHealth: {
        status: "healthy" | "warning" | "critical"
        uptime: number
        responseTime: number
    }
}

// Form types
export interface LoginFormData {
    email: string
    password: string
}

export interface RegisterFormData {
    name: string
    email: string
    password: string
    confirmPassword: string
    role: "tourist" | "admin"
}

export interface PreferencesFormData {
    interests: string[]
    budget: "budget" | "moderate" | "luxury"
    startDate: string
    endDate: string
    groupSize: number
    travelStyle: string[]
    accessibility: string[]
}
