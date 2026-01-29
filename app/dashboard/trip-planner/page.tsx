"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
    Users,
    Calendar,
    DollarSign,
    MapPin,
    Heart,
    Camera,
    Utensils,
    ShoppingBag,
    Hotel,
    Car,
    Plane,
    Clock,
    Star,
    ChevronRight,
    ChevronLeft,
    Check
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useTravelPlanContext } from "@/contexts/TravelPlanContext"

interface TripPreferences {
    tripType: string
    groupSize: string
    duration: string
    budget: string
    interests: string[]
    accommodation: string
    transportation: string
    pace: string
    name: string
}

const tripTypes = [
    { id: "solo", label: "Solo Adventure", icon: Users, description: "Perfect for self-discovery and flexibility" },
    { id: "couple", label: "Romantic Getaway", icon: Heart, description: "Ideal for couples seeking memorable experiences" },
    { id: "family", label: "Family Trip", icon: Users, description: "Kid-friendly activities for all ages" },
    { id: "friends", label: "Friends Group", icon: Users, description: "Exciting experiences for friend groups" },
]

const groupSizes = [
    { id: "1", label: "Just Me", description: "Solo traveler" },
    { id: "2", label: "Couple", description: "2 people" },
    { id: "3-4", label: "Small Group", description: "3-4 people" },
    { id: "5+", label: "Large Group", description: "5+ people" },
]

const durations = [
    { id: "3-5", label: "Quick Getaway", description: "3-5 days", icon: Calendar },
    { id: "7-10", label: "Week Adventure", description: "7-10 days", icon: Calendar },
    { id: "14+", label: "Extended Journey", description: "14+ days", icon: Calendar },
]

const budgets = [
    { id: "budget", label: "Budget-Friendly", description: "$50-100/day", icon: DollarSign },
    { id: "mid", label: "Comfortable", description: "$100-200/day", icon: DollarSign },
    { id: "luxury", label: "Luxury Experience", description: "$200+/day", icon: Star },
]

const interests = [
    { id: "history", label: "Ancient History", icon: Camera },
    { id: "adventure", label: "Adventure", icon: MapPin },
    { id: "culture", label: "Local Culture", icon: Heart },
    { id: "food", label: "Egyptian Cuisine", icon: Utensils },
    { id: "shopping", label: "Shopping", icon: ShoppingBag },
    { id: "relaxation", label: "Relaxation", icon: Hotel },
]

const accommodations = [
    { id: "budget", label: "Budget Hotels", description: "Clean, basic accommodations" },
    { id: "mid", label: "Mid-Range Hotels", description: "Comfortable with amenities" },
    { id: "luxury", label: "Luxury Resorts", description: "Premium experiences" },
    { id: "local", label: "Local Guesthouses", description: "Authentic local experience" },
]

const transportation = [
    { id: "public", label: "Public Transport", description: "Buses, trains, local experience" },
    { id: "private", label: "Private Car", description: "Comfortable and flexible" },
    { id: "mixed", label: "Mixed Transport", description: "Combination of options" },
]

const paces = [
    { id: "relaxed", label: "Relaxed Pace", description: "2-3 activities per day" },
    { id: "moderate", label: "Moderate Pace", description: "3-4 activities per day" },
    { id: "packed", label: "Action-Packed", description: "5+ activities per day" },
]

export default function TripPlannerPage() {
    const router = useRouter()
    const { createTravelPlan } = useTravelPlanContext()
    const [currentStep, setCurrentStep] = useState(0)
    const [preferences, setPreferences] = useState<TripPreferences>({
        tripType: "",
        groupSize: "",
        duration: "",
        budget: "",
        interests: [],
        accommodation: "",
        transportation: "",
        pace: "",
        name: ""
    })

    const totalSteps = 8
    const progress = ((currentStep + 1) / totalSteps) * 100

    const steps = [
        { title: "Trip Type", description: "What kind of traveler are you?" },
        { title: "Group Size", description: "How many people are traveling?" },
        { title: "Duration", description: "How long is your trip?" },
        { title: "Budget", description: "What's your daily budget?" },
        { title: "Interests", description: "What interests you most?" },
        { title: "Accommodation", description: "Where would you like to stay?" },
        { title: "Transportation", description: "How do you prefer to travel?" },
        { title: "Trip Pace", description: "What's your preferred pace?" },
    ]

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleInterestToggle = (interestId: string) => {
        setPreferences(prev => ({
            ...prev,
            interests: prev.interests.includes(interestId)
                ? prev.interests.filter(id => id !== interestId)
                : [...prev.interests, interestId]
        }))
    }

    const handleCreatePlan = async () => {
        const planName = `${preferences.tripType.charAt(0).toUpperCase() + preferences.tripType.slice(1)} Egypt Adventure`

        // Create a sample travel plan based on preferences
        const startDate = new Date()
        const days = parseInt(preferences.duration.split('-')[0]) || 7
        const endDate = new Date()
        endDate.setDate(startDate.getDate() + days)

        const newPlan = {
            name: planName,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            status: "draft" as const,
            preferences: preferences,
            days: Array.from({ length: days }, (_, i) => ({
                dayNumber: i + 1,
                date: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000).toISOString(),
                activities: [
                    {
                        id: `activity-${i}-1`,
                        destinationId: "cairo-city-center",
                        activityId: `activity-${i}-1`,
                        startTime: "09:00",
                        endTime: "10:00",
                        notes: i === 0 ? "Arrival & Check-in" : "Breakfast at Hotel"
                    },
                    {
                        id: `activity-${i}-2`,
                        destinationId: "cairo-historical-sites",
                        activityId: `activity-${i}-2`,
                        startTime: "14:00",
                        endTime: "16:00",
                        notes: i === 0 ? "Explore Local Area" : "Visit Historical Sites"
                    }
                ]
            }))
        }

        createTravelPlan(newPlan)
        router.push("/dashboard/travel-plan")
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tripTypes.map((type) => {
                            const Icon = type.icon
                            return (
                                <Card
                                    key={type.id}
                                    className={`cursor-pointer transition-all hover:shadow-lg ${preferences.tripType === type.id
                                        ? "ring-2 ring-gray-800 bg-gray-50"
                                        : "hover:bg-gray-50"
                                        }`}
                                    onClick={() => setPreferences(prev => ({ ...prev, tripType: type.id }))}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-gray-700" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 mb-1">{type.label}</h3>
                                                <p className="text-sm text-gray-500">{type.description}</p>
                                            </div>
                                            {preferences.tripType === type.id && (
                                                <Check className="w-5 h-5 text-gray-800" />
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )

            case 1:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {groupSizes.map((size) => (
                            <Card
                                key={size.id}
                                className={`cursor-pointer transition-all hover:shadow-lg ${preferences.groupSize === size.id
                                    ? "ring-2 ring-gray-800 bg-gray-50"
                                    : "hover:bg-gray-50"
                                    }`}
                                onClick={() => setPreferences(prev => ({ ...prev, groupSize: size.id }))}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{size.label}</h3>
                                            <p className="text-sm text-gray-500">{size.description}</p>
                                        </div>
                                        {preferences.groupSize === size.id && (
                                            <Check className="w-5 h-5 text-gray-800" />
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )

            case 2:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {durations.map((duration) => {
                            const Icon = duration.icon
                            return (
                                <Card
                                    key={duration.id}
                                    className={`cursor-pointer transition-all hover:shadow-lg ${preferences.duration === duration.id
                                        ? "ring-2 ring-gray-800 bg-gray-50"
                                        : "hover:bg-gray-50"
                                        }`}
                                    onClick={() => setPreferences(prev => ({ ...prev, duration: duration.id }))}
                                >
                                    <CardContent className="p-6 text-center">
                                        <Icon className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                                        <h3 className="font-semibold text-gray-900 mb-1">{duration.label}</h3>
                                        <p className="text-sm text-gray-500">{duration.description}</p>
                                        {preferences.duration === duration.id && (
                                            <Check className="w-5 h-5 text-gray-800 mx-auto mt-2" />
                                        )}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )

            case 3:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {budgets.map((budget) => {
                            const Icon = budget.icon
                            return (
                                <Card
                                    key={budget.id}
                                    className={`cursor-pointer transition-all hover:shadow-lg ${preferences.budget === budget.id
                                        ? "ring-2 ring-gray-800 bg-gray-50"
                                        : "hover:bg-gray-50"
                                        }`}
                                    onClick={() => setPreferences(prev => ({ ...prev, budget: budget.id }))}
                                >
                                    <CardContent className="p-6 text-center">
                                        <Icon className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                                        <h3 className="font-semibold text-gray-900 mb-1">{budget.label}</h3>
                                        <p className="text-sm text-gray-500">{budget.description}</p>
                                        {preferences.budget === budget.id && (
                                            <Check className="w-5 h-5 text-gray-800 mx-auto mt-2" />
                                        )}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )

            case 4:
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {interests.map((interest) => {
                            const Icon = interest.icon
                            const isSelected = preferences.interests.includes(interest.id)
                            return (
                                <Card
                                    key={interest.id}
                                    className={`cursor-pointer transition-all hover:shadow-lg ${isSelected
                                        ? "ring-2 ring-gray-800 bg-gray-50"
                                        : "hover:bg-gray-50"
                                        }`}
                                    onClick={() => handleInterestToggle(interest.id)}
                                >
                                    <CardContent className="p-4 text-center">
                                        <Icon className="w-6 h-6 text-gray-700 mx-auto mb-2" />
                                        <h3 className="font-medium text-gray-900 text-sm">{interest.label}</h3>
                                        {isSelected && (
                                            <Check className="w-4 h-4 text-gray-800 mx-auto mt-2" />
                                        )}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )

            case 5:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {accommodations.map((accommodation) => (
                            <Card
                                key={accommodation.id}
                                className={`cursor-pointer transition-all hover:shadow-lg ${preferences.accommodation === accommodation.id
                                    ? "ring-2 ring-gray-800 bg-gray-50"
                                    : "hover:bg-gray-50"
                                    }`}
                                onClick={() => setPreferences(prev => ({ ...prev, accommodation: accommodation.id }))}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{accommodation.label}</h3>
                                            <p className="text-sm text-gray-500">{accommodation.description}</p>
                                        </div>
                                        {preferences.accommodation === accommodation.id && (
                                            <Check className="w-5 h-5 text-gray-800" />
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )

            case 6:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {transportation.map((transport) => (
                            <Card
                                key={transport.id}
                                className={`cursor-pointer transition-all hover:shadow-lg ${preferences.transportation === transport.id
                                    ? "ring-2 ring-gray-800 bg-gray-50"
                                    : "hover:bg-gray-50"
                                    }`}
                                onClick={() => setPreferences(prev => ({ ...prev, transportation: transport.id }))}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{transport.label}</h3>
                                            <p className="text-sm text-gray-500">{transport.description}</p>
                                        </div>
                                        {preferences.transportation === transport.id && (
                                            <Check className="w-5 h-5 text-gray-800" />
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )

            case 7:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {paces.map((pace) => (
                            <Card
                                key={pace.id}
                                className={`cursor-pointer transition-all hover:shadow-lg ${preferences.pace === pace.id
                                    ? "ring-2 ring-gray-800 bg-gray-50"
                                    : "hover:bg-gray-50"
                                    }`}
                                onClick={() => setPreferences(prev => ({ ...prev, pace: pace.id }))}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{pace.label}</h3>
                                            <p className="text-sm text-gray-500">{pace.description}</p>
                                        </div>
                                        {preferences.pace === pace.id && (
                                            <Check className="w-5 h-5 text-gray-800" />
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )

            default:
                return null
        }
    }

    const canProceed = () => {
        switch (currentStep) {
            case 0:
                return preferences.tripType !== ""
            case 1:
                return preferences.groupSize !== ""
            case 2:
                return preferences.duration !== ""
            case 3:
                return preferences.budget !== ""
            case 4:
                return preferences.interests.length > 0
            case 5:
                return preferences.accommodation !== ""
            case 6:
                return preferences.transportation !== ""
            case 7:
                return preferences.pace !== ""
            default:
                return false
        }
    }

    return (
        <div className="max-w-4xl mx-auto pb-12">
            {/* Header */}
            <div className="mb-8">
                <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 flex items-center mb-4">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                </Link>
                <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Plan Your Egypt Adventure</h1>
                <p className="text-gray-600">Answer a few questions to create your personalized itinerary</p>
            </div>

            {/* Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Step {currentStep + 1} of {totalSteps}</span>
                    <span className="text-sm font-medium text-gray-700">{steps[currentStep].title}</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">{steps[currentStep].description}</p>
            </div>

            {/* Content */}
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-xl text-gray-900">{steps[currentStep].title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {renderStepContent()}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </Button>

                {currentStep === totalSteps - 1 ? (
                    <Button
                        onClick={handleCreatePlan}
                        disabled={!canProceed()}
                        className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2"
                    >
                        Create My Trip
                        <Check className="w-4 h-4" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </div>
    )
}
