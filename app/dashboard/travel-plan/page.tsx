"use client"

import { useTravelPlanContext } from "@/contexts/TravelPlanContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, MapPin, Clock, Edit2, Download, Share2, Map as MapIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TravelPlanPage() {
    const { travelPlan } = useTravelPlanContext()

    if (!travelPlan) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calendar className="w-10 h-10 text-gray-300" />
                    </div>
                    <h1 className="font-display text-2xl font-bold mb-3 text-gray-900">No Travel Plan Yet</h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        You haven&apos;t created a travel itinerary yet. Let our AI help you plan the perfect Egyptian adventure.
                    </p>
                    <Link href="/dashboard/trip-planner">
                        <Button size="lg" className="w-full bg-gray-800 hover:bg-gray-900">
                            Create New Plan
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 flex items-center mb-2">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="font-display text-4xl font-bold text-gray-900">{travelPlan.name}</h1>
                    <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {new Date(travelPlan.startDate).toLocaleDateString()} - {new Date(travelPlan.endDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{travelPlan.days.length} Days</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                    <Link href="/dashboard/preferences">
                        <Button className="bg-egyptian-nile text-white hover:bg-egyptian-nile/90">
                            <Edit2 className="w-4 h-4 mr-2" /> Edit Preferences
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Timeline */}
            <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-8 top-4 bottom-4 w-0.5 bg-gray-200 hidden md:block" />

                {travelPlan.days.map((day, index) => (
                    <motion.div
                        key={day.dayNumber}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative pl-0 md:pl-20"
                    >
                        {/* Day Marker */}
                        <div className="absolute left-0 w-16 h-16 bg-white border-2 border-egyptian-gold rounded-full flex flex-col items-center justify-center z-10 hidden md:flex shadow-sm">
                            <span className="text-xs text-gray-500 font-medium">Day</span>
                            <span className="text-xl font-bold text-egyptian-nile">{day.dayNumber}</span>
                        </div>

                        {/* Mobile Marker */}
                        <div className="flex md:hidden items-center gap-2 mb-4">
                            <span className="bg-egyptian-gold text-white px-3 py-1 rounded-lg text-sm font-bold">Day {day.dayNumber}</span>
                            <span className="text-gray-500 text-sm">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                        </div>

                        <div className="space-y-4">
                            {day.activities.map((activity, actIndex) => (
                                <Card key={activity.id} className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden bg-white group">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Time Column */}
                                        <div className="w-full md:w-32 bg-gray-50 p-4 md:p-6 flex flex-row md:flex-col items-center md:justify-center gap-2 border-b md:border-b-0 md:border-r border-gray-100">
                                            <MapIcon className="w-8 h-8 text-gray-600" />
                                            <div className="text-sm font-medium text-gray-600">
                                                {activity.startTime}
                                            </div>
                                            <div className="h-px w-4 bg-gray-300 hidden md:block" />
                                            <div className="text-sm text-gray-500">
                                                {activity.endTime}
                                            </div>
                                        </div>

                                        {/* Content Column */}
                                        <div className="p-4 md:p-6 flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-egyptian-terracotta transition-colors">
                                                        Visit {activity.destinationId}
                                                    </h3>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <MapPin className="w-3.5 h-3.5 mr-1" />
                                                        <span>Cairo, Egypt</span>
                                                    </div>
                                                </div>
                                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none">
                                                    Activity
                                                </Badge>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                Enjoy a guided tour of the Great Pyramids of Giza, the last surviving wonder of the ancient world.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}

                            {day.accommodation && (
                                <Card className="bg-amber-50/50 border-amber-100 border shadow-none">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-amber-600 text-lg">🛏️</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Accommodation</p>
                                            <p className="font-medium text-gray-900">{day.accommodation.name}</p>
                                            <p className="text-xs text-gray-500">{day.accommodation.location}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
