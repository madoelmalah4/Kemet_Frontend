import { TaxiLocation, TaxiFareEstimate } from "@/types"

export const taxiLocations: TaxiLocation[] = [
    {
        id: "loc-1",
        name: "Cairo International Airport",
        type: "airport",
        coordinates: { lat: 30.1219, lng: 31.4056 }
    },
    {
        id: "loc-2",
        name: "Pyramids of Giza",
        type: "attraction",
        coordinates: { lat: 29.9792, lng: 31.1342 }
    },
    {
        id: "loc-3",
        name: "Downtown Cairo (Tahrir Square)",
        type: "city",
        coordinates: { lat: 30.0444, lng: 31.2357 }
    },
    {
        id: "loc-4",
        name: "Egyptian Museum",
        type: "attraction",
        coordinates: { lat: 30.0478, lng: 31.2336 }
    },
    {
        id: "loc-5",
        name: "Khan el-Khalili Bazaar",
        type: "attraction",
        coordinates: { lat: 30.0475, lng: 31.2622 }
    },
    {
        id: "loc-6",
        name: "Citadel of Saladin",
        type: "attraction",
        coordinates: { lat: 30.0296, lng: 31.2597 }
    },
    {
        id: "loc-7",
        name: "Luxor Temple",
        type: "attraction",
        coordinates: { lat: 25.6995, lng: 32.6392 }
    },
    {
        id: "loc-8",
        name: "Luxor Airport",
        type: "airport",
        coordinates: { lat: 25.6711, lng: 32.7066 }
    },
    {
        id: "loc-9",
        name: "Aswan Airport",
        type: "airport",
        coordinates: { lat: 23.9644, lng: 32.8200 }
    },
    {
        id: "loc-10",
        name: "Hurghada Airport",
        type: "airport",
        coordinates: { lat: 27.1783, lng: 33.7994 }
    }
]

// Base rates in EGP
const BASE_FARE = 7
const PER_KM_RATE = 3.5
const AIRPORT_SURCHARGE = 20

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

export function calculateTaxiFare(fromId: string, toId: string): TaxiFareEstimate | null {
    const fromLocation = taxiLocations.find(l => l.id === fromId)
    const toLocation = taxiLocations.find(l => l.id === toId)

    if (!fromLocation || !toLocation) return null

    const distance = calculateDistance(
        fromLocation.coordinates.lat,
        fromLocation.coordinates.lng,
        toLocation.coordinates.lat,
        toLocation.coordinates.lng
    )

    const airportSurcharge = (fromLocation.type === "airport" || toLocation.type === "airport")
        ? AIRPORT_SURCHARGE
        : 0

    const baseFareTotal = BASE_FARE + (distance * PER_KM_RATE) + airportSurcharge

    // Add 20% variance for min/max
    const minFare = Math.round(baseFareTotal * 0.9)
    const maxFare = Math.round(baseFareTotal * 1.1)

    // Estimate duration (assuming average speed of 40 km/h in city, 60 km/h highway)
    const avgSpeed = distance > 20 ? 60 : 40
    const durationMinutes = Math.round((distance / avgSpeed) * 60)
    const hours = Math.floor(durationMinutes / 60)
    const minutes = durationMinutes % 60
    const duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

    return {
        from: fromLocation.name,
        to: toLocation.name,
        distance: Math.round(distance * 10) / 10,
        duration,
        estimatedFare: {
            min: minFare,
            max: maxFare,
            currency: "EGP"
        },
        fareBreakdown: {
            baseFare: BASE_FARE,
            perKm: PER_KM_RATE,
            total: Math.round(baseFareTotal)
        }
    }
}
