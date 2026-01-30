import { User, TravelPlan } from "@/types"

export const users: User[] = [
    {
        id: "1",
        email: "tourist@example.com",
        name: "John Doe",
        role: "tourist",
        password: "password123",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        preferences: {
            language: "en",
            currency: "USD",
            notifications: true,
            theme: "light",
            interests: ["History", "Culture", "Food"]
        }
    },
    {
        id: "2",
        email: "admin@example.com",
        name: "Admin User",
        role: "admin",
        password: "password123",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        preferences: {
            language: "en",
            currency: "EGP",
            notifications: true,
            theme: "light"
        }
    }
]

export const mockTravelPlans: TravelPlan[] = [
    {
        id: "tp1",
        userId: "1",
        name: "Cairo Adventure",
        destination: "Cairo",
        startDate: "2024-05-01",
        endDate: "2024-05-07",
        budget: 2000,
        preferences: {
            interests: ["History", "Food"],
            pace: "moderate",
            accommodation: "hotel",
            transportation: "private"
        },
        days: [],
        status: "draft",
        createdAt: "2024-04-01T10:00:00Z",
        updatedAt: "2024-04-01T10:00:00Z"
    }
]
