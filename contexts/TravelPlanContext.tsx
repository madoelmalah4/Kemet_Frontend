"use client"

import React, { createContext, useContext, useState } from "react"
import { TravelPlan, TouristPreferences } from "@/types"
import { mockTravelPlans } from "@/data/users"
import { useCreateTravelPlanMutation } from "@/store/features/travelPlan/travelPlanApi"

interface TravelPlanContextType {
    travelPlan: TravelPlan | null
    preferences: TouristPreferences | null
    setPreferences: (prefs: TouristPreferences) => void
    updateTravelPlan: (plan: TravelPlan) => void
    createTravelPlan: (plan: Partial<TravelPlan>) => void
}

const TravelPlanContext = createContext<TravelPlanContextType | undefined>(undefined)

export function TravelPlanProvider({ children }: { children: React.ReactNode }) {
    const [preferences, setPreferencesState] = useState<TouristPreferences | null>(null)
    const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(mockTravelPlans[0] || null)
    const [createTravelPlan, { isLoading }] = useCreateTravelPlanMutation()

    const setPreferences = (prefs: TouristPreferences) => {
        setPreferencesState(prefs)
        // In a real app, this would trigger AI to generate a travel plan
        console.log("Preferences saved:", prefs)
    }

    const updateTravelPlan = (plan: TravelPlan) => {
        setTravelPlan(plan)
        // In a real app, this would save to backend
        console.log("Travel plan updated:", plan)
    }

    const createTravelPlanHandler = async (plan: Partial<TravelPlan>) => {
        try {
            const result = await createTravelPlan(plan).unwrap()
            setTravelPlan(result)
            console.log("Travel plan created:", result)
        } catch (error) {
            console.error("Failed to create travel plan:", error)
        }
    }

    const value: TravelPlanContextType = {
        travelPlan,
        preferences,
        setPreferences,
        updateTravelPlan,
        createTravelPlan: createTravelPlanHandler
    }

    return <TravelPlanContext.Provider value={value}>{children}</TravelPlanContext.Provider>
}

export function useTravelPlanContext() {
    const context = useContext(TravelPlanContext)
    if (context === undefined) {
        throw new Error("useTravelPlanContext must be used within a TravelPlanProvider")
    }
    return context
}
