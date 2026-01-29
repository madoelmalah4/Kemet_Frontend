"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, MapPin, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import OptimizedImage from "@/components/ui/optimized-image"
import { useGetDestinationsQuery } from "@/store/features/destinations/destinationsApi"

export default function DestinationsPage() {
    const [searchTerm, setSearchTerm] = useState("")

    // Fetch destinations from API
    const { data: destinations = [], isLoading, error } = useGetDestinationsQuery()

    // Filter destinations based on search term
    const filteredDestinations = destinations.filter(dest => {
        const matchesSearch =
            dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dest.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dest.description?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
    })

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
                <p className="text-red-500 font-semibold text-lg">Failed to load destinations.</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-16 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                            Explore Egypt
                        </h1>
                        <p className="text-lg text-gray-600">
                            Discover ancient wonders and unforgettable experiences across the land of the Pharaohs
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Search Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-10"
                >
                    <Card className="border-gray-200 shadow-sm">
                        <CardContent className="p-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    type="text"
                                    placeholder="Search destinations, landmarks, cities..."
                                    className="pl-12 h-12 bg-white border-gray-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Results Count */}
                {filteredDestinations.length > 0 && (
                    <div className="mb-6">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-900">{filteredDestinations.length}</span> destination{filteredDestinations.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                )}

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDestinations.map((destination, index) => (
                        <motion.div
                            key={destination.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <Link href={`/destinations/${destination.id}`} className="block h-full">
                                <Card className="group h-full overflow-hidden border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        {destination.imageUrl ? (
                                            <OptimizedImage
                                                src={destination.imageUrl}
                                                alt={destination.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                No Image
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="absolute top-3 right-3">
                                            <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {destination.city}
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="p-5">
                                        <h3 className="font-display text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {destination.name}
                                        </h3>

                                        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                                            {destination.description}
                                        </p>

                                        <div className="flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                                            View Details
                                            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredDestinations.length === 0 && (
                    <Card className="border-gray-200">
                        <CardContent className="py-16 text-center">
                            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Search className="h-7 w-7 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No destinations found</h3>
                            <p className="text-gray-500 mb-6">Try adjusting your search terms.</p>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setSearchTerm("")}
                                className="border-gray-300"
                            >
                                Clear search
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
