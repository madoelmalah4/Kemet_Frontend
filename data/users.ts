import { User, TravelPlan } from "@/types"

export const mockUsers: User[] = [
    {
        id: "tourist-1",
        email: "tourist@example.com",
        name: "Sarah Johnson",
        role: "tourist",
        avatar: "/images/avatar-tourist.jpg",
        preferences: {
            interests: ["Historical Sites", "Cultural Experiences", "Photography"],
            budget: "moderate",
            travelDates: {
                start: "2026-03-15",
                end: "2026-03-25"
            },
            groupSize: 2,
            travelStyle: ["Guided Tours", "Flexible Schedule"],
            accessibility: []
        },
        createdAt: "2026-01-10T10:00:00Z"
    },
    {
        id: "admin-1",
        email: "admin@egypttourism.com",
        name: "Ahmed Hassan",
        role: "admin",
        avatar: "/images/avatar-admin.jpg",
        createdAt: "2025-06-01T08:00:00Z"
    }
]

export const mockTravelPlans: TravelPlan[] = [
    {
        id: "plan-1",
        userId: "tourist-1",
        name: "10-Day Egyptian Adventure",
        startDate: "2026-03-15",
        endDate: "2026-03-25",
        budget: 2500,
        status: "confirmed",
        days: [
            {
                dayNumber: 1,
                date: "2026-03-15",
                activities: [
                    {
                        id: "act-1",
                        destinationId: "1",
                        activityId: "a1",
                        startTime: "09:00",
                        endTime: "12:00",
                        notes: "Book tickets in advance"
                    },
                    {
                        id: "act-2",
                        destinationId: "1",
                        activityId: "a2",
                        startTime: "14:00",
                        endTime: "15:30",
                        notes: "Bring sunscreen and water"
                    }
                ],
                accommodation: {
                    name: "Marriott Mena House",
                    location: "Giza",
                    checkIn: "2026-03-15T15:00:00Z",
                    checkOut: "2026-03-17T12:00:00Z"
                },
                notes: "First day in Cairo - take it easy"
            },
            {
                dayNumber: 2,
                date: "2026-03-16",
                activities: [
                    {
                        id: "act-3",
                        destinationId: "1",
                        activityId: "a3",
                        startTime: "19:00",
                        endTime: "20:30",
                        notes: "Sound and Light show at pyramids"
                    }
                ],
                notes: "Rest day with evening show"
            },
            {
                dayNumber: 3,
                date: "2026-03-17",
                activities: [],
                accommodation: {
                    name: "Steigenberger Nile Palace",
                    location: "Luxor",
                    checkIn: "2026-03-17T15:00:00Z",
                    checkOut: "2026-03-20T12:00:00Z"
                },
                notes: "Travel day to Luxor"
            }
        ],
        createdAt: "2026-01-15T14:30:00Z",
        updatedAt: "2026-01-20T09:15:00Z"
    }
]

export function getUserByEmail(email: string): User | undefined {
    return mockUsers.find(u => u.email === email)
}

export function getUserById(id: string): User | undefined {
    return mockUsers.find(u => u.id === id)
}

export function getTravelPlansByUserId(userId: string): TravelPlan[] {
    return mockTravelPlans.filter(p => p.userId === userId)
}
