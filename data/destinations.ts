import { Destination } from "@/types"

export const destinations: any[] = [
    {
        id: "1",
        name: "The Great Pyramids of Giza",
        slug: "great-pyramids-giza",
        description: "Ancient wonders of the world, standing testament to Egyptian engineering prowess",
        longDescription: "The Great Pyramids of Giza are among the most iconic structures in human history. Built over 4,500 years ago, these magnificent monuments continue to captivate visitors with their grandeur and mystery. The complex includes the Great Pyramid of Khufu, the Pyramid of Khafre, the Pyramid of Menkaure, and the enigmatic Great Sphinx.",
        location: {
            city: "Giza",
            region: "Greater Cairo",
            coordinates: { lat: 29.9792, lng: 31.1342 }
        },
        images: [
            "https://images.unsplash.com/photo-1539650116455-251d93d5ce3d?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1599388308480-1557d0ca9c64?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1669230588669-05d556488dcb?q=80&w=1974&auto=format&fit=crop"
        ],
        vrTourUrl: "https://my.matterport.com/show/?m=sample-pyramids",
        activities: [
            {
                id: "a1",
                name: "Pyramid Interior Tour",
                description: "Explore the inner chambers of the Great Pyramid",
                duration: "1.5 hours",
                price: 400,
                category: "Historical",
                included: false
            },
            {
                id: "a2",
                name: "Camel Ride",
                description: "Traditional camel ride around the pyramid complex",
                duration: "30 minutes",
                price: 150,
                category: "Adventure",
                included: true
            },
            {
                id: "a3",
                name: "Sound & Light Show",
                description: "Evening spectacular telling the story of ancient Egypt",
                duration: "1 hour",
                price: 250,
                category: "Entertainment",
                included: false
            }
        ],
        bestTimeToVisit: ["October", "November", "February", "March", "April"],
        averageTemperature: {
            summer: "35°C",
            winter: "20°C"
        },
        highlights: [
            "The only remaining wonder of the ancient world",
            "Great Sphinx guardian statue",
            "Solar Boat Museum",
            "Panoramic viewpoint"
        ],
        entryFee: {
            local: 60,
            foreign: 240,
            currency: "EGP"
        },
        estimatedDuration: "3-4 hours",
        category: ["Historical", "UNESCO World Heritage", "Ancient Wonders"],
        rating: 4.8,
        reviewCount: 15420
    },
    {
        id: "2",
        name: "Luxor Temple & Valley of the Kings",
        slug: "luxor-valley-kings",
        description: "Journey through ancient Thebes and explore royal tombs",
        longDescription: "Luxor, often called the world's greatest open-air museum, houses some of Egypt's most spectacular ancient monuments. The Valley of the Kings contains the tombs of pharaohs including Tutankhamun, while Luxor Temple showcases stunning architecture along the Nile.",
        location: {
            city: "Luxor",
            region: "Upper Egypt",
            coordinates: { lat: 25.6872, lng: 32.6396 }
        },
        images: [
            "https://images.unsplash.com/photo-1544865183-4914c67ae96b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1568297728259-2d1f97241280?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=2070&auto=format&fit=crop"
        ],
        vrTourUrl: "https://my.matterport.com/show/?m=sample-luxor",
        activities: [
            {
                id: "a4",
                name: "Valley of the Kings Tour",
                description: "Visit the royal tombs of ancient pharaohs",
                duration: "3 hours",
                price: 500,
                category: "Historical",
                included: true
            },
            {
                id: "a5",
                name: "Hot Air Balloon Ride",
                description: "Sunrise balloon flight over the ancient sites",
                duration: "2 hours",
                price: 1200,
                category: "Adventure",
                included: false
            },
            {
                id: "a6",
                name: "Karnak Temple Complex",
                description: "Explore the vast temple complex dedicated to Amun-Ra",
                duration: "2 hours",
                price: 300,
                category: "Historical",
                included: true
            }
        ],
        bestTimeToVisit: ["October", "November", "December", "January", "February", "March"],
        averageTemperature: {
            summer: "40°C",
            winter: "23°C"
        },
        highlights: [
            "Tomb of Tutankhamun",
            "Karnak Temple Complex",
            "Luxor Temple illuminated at night",
            "Colossi of Memnon",
            "Temple of Hatshepsut"
        ],
        entryFee: {
            local: 100,
            foreign: 400,
            currency: "EGP"
        },
        estimatedDuration: "Full day",
        category: ["Historical", "UNESCO World Heritage", "Archaeological"],
        rating: 4.9,
        reviewCount: 12850
    },
    {
        id: "3",
        name: "Alexandria - Pearl of the Mediterranean",
        slug: "alexandria-mediterranean",
        description: "Historic coastal city blending ancient and modern cultures",
        longDescription: "Founded by Alexander the Great, Alexandria was once home to the legendary Library and Lighthouse. Today, it offers a unique blend of Mediterranean charm, ancient history, and modern Egyptian culture along its beautiful corniche.",
        location: {
            city: "Alexandria",
            region: "Mediterranean Coast",
            coordinates: { lat: 31.2001, lng: 29.9187 }
        },
        images: [
            "https://images.unsplash.com/photo-1574712079083-d5dcdf93e43a?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1563292776-628c68aa07e0?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590059530462-843c0802773d?q=80&w=1974&auto=format&fit=crop"
        ],
        vrTourUrl: "https://my.matterport.com/show/?m=sample-alexandria",
        activities: [
            {
                id: "a7",
                name: "Bibliotheca Alexandrina",
                description: "Visit the modern library commemorating the ancient one",
                duration: "2 hours",
                price: 100,
                category: "Cultural",
                included: true
            },
            {
                id: "a8",
                name: "Qaitbay Citadel",
                description: "15th-century fortress on the site of the ancient lighthouse",
                duration: "1.5 hours",
                price: 80,
                category: "Historical",
                included: true
            },
            {
                id: "a9",
                name: "Corniche Walk & Seafood Dinner",
                description: "Stroll along the Mediterranean and enjoy fresh seafood",
                duration: "3 hours",
                price: 350,
                category: "Culinary",
                included: false
            }
        ],
        bestTimeToVisit: ["March", "April", "May", "September", "October", "November"],
        averageTemperature: {
            summer: "30°C",
            winter: "18°C"
        },
        highlights: [
            "Bibliotheca Alexandrina",
            "Qaitbay Citadel",
            "Catacombs of Kom el Shoqafa",
            "Montaza Palace Gardens",
            "Mediterranean beaches"
        ],
        entryFee: {
            local: 40,
            foreign: 160,
            currency: "EGP"
        },
        estimatedDuration: "Full day",
        category: ["Historical", "Coastal", "Cultural"],
        rating: 4.6,
        reviewCount: 8340
    },
    {
        id: "4",
        name: "Aswan & Abu Simbel",
        slug: "aswan-abu-simbel",
        description: "Nubian culture and Ramses II's magnificent temples",
        longDescription: "Aswan offers a more relaxed pace along the Nile, with beautiful islands, Nubian villages, and the engineering marvel of the High Dam. Nearby Abu Simbel features the colossal temples of Ramses II, relocated to save them from flooding.",
        location: {
            city: "Aswan",
            region: "Upper Egypt",
            coordinates: { lat: 24.0889, lng: 32.8998 }
        },
        images: [
            "https://images.unsplash.com/photo-1596708688562-f7034c442436?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590425776662-e22a83ea1c84?q=80&w=2071&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1598555850978-22830f62243d?q=80&w=2070&auto=format&fit=crop"
        ],
        vrTourUrl: "https://my.matterport.com/show/?m=sample-aswan",
        activities: [
            {
                id: "a10",
                name: "Abu Simbel Temples",
                description: "Visit the magnificent rock temples of Ramses II",
                duration: "4 hours (with travel)",
                price: 800,
                category: "Historical",
                included: true
            },
            {
                id: "a11",
                name: "Felucca Sailing",
                description: "Traditional sailboat cruise on the Nile",
                duration: "2 hours",
                price: 200,
                category: "Leisure",
                included: true
            },
            {
                id: "a12",
                name: "Nubian Village Visit",
                description: "Experience authentic Nubian culture and hospitality",
                duration: "3 hours",
                price: 250,
                category: "Cultural",
                included: false
            }
        ],
        bestTimeToVisit: ["October", "November", "December", "January", "February"],
        averageTemperature: {
            summer: "42°C",
            winter: "25°C"
        },
        highlights: [
            "Abu Simbel Temples",
            "Philae Temple on Agilkia Island",
            "Aswan High Dam",
            "Nubian Museum",
            "Elephantine Island"
        ],
        entryFee: {
            local: 80,
            foreign: 320,
            currency: "EGP"
        },
        estimatedDuration: "2-3 days",
        category: ["Historical", "Cultural", "UNESCO World Heritage"],
        rating: 4.7,
        reviewCount: 6720
    },
    {
        id: "5",
        name: "Red Sea Riviera - Hurghada & Sharm El Sheikh",
        slug: "red-sea-riviera",
        description: "World-class diving and beach resorts on pristine waters",
        longDescription: "The Red Sea coast offers some of the world's best diving and snorkeling, with vibrant coral reefs and diverse marine life. Modern resorts provide luxury amenities while maintaining access to stunning natural beauty.",
        location: {
            city: "Hurghada",
            region: "Red Sea",
            coordinates: { lat: 27.2579, lng: 33.8116 }
        },
        images: [
            "https://images.unsplash.com/photo-1510846606678-710c05a5c776?q=80&w=2069&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544551763-8a39e80e3037?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1598460677610-c081691456a2?q=80&w=2070&auto=format&fit=crop"
        ],
        vrTourUrl: "https://my.matterport.com/show/?m=sample-redsea",
        activities: [
            {
                id: "a13",
                name: "Scuba Diving",
                description: "Explore vibrant coral reefs and marine life",
                duration: "Half day",
                price: 600,
                category: "Adventure",
                included: false
            },
            {
                id: "a14",
                name: "Snorkeling Trip",
                description: "Boat trip to the best snorkeling spots",
                duration: "4 hours",
                price: 350,
                category: "Adventure",
                included: true
            },
            {
                id: "a15",
                name: "Desert Safari",
                description: "Quad biking and Bedouin dinner in the desert",
                duration: "5 hours",
                price: 450,
                category: "Adventure",
                included: false
            }
        ],
        bestTimeToVisit: ["March", "April", "May", "September", "October", "November"],
        averageTemperature: {
            summer: "35°C",
            winter: "22°C"
        },
        highlights: [
            "World-class diving sites",
            "Giftun Island",
            "Vibrant coral reefs",
            "Desert safari adventures",
            "Luxury beach resorts"
        ],
        entryFee: {
            local: 0,
            foreign: 0,
            currency: "EGP"
        },
        estimatedDuration: "3-7 days",
        category: ["Beach", "Adventure", "Diving"],
        rating: 4.5,
        reviewCount: 11200
    }
]

export function getDestinationById(id: string): any | undefined {
    return destinations.find(d => d.id === id)
}

export function getDestinationBySlug(slug: string): any | undefined {
    return destinations.find(d => d.slug === slug)
}

export function getDestinationsByCategory(category: string): any[] {
    return destinations.filter(d => d.category.includes(category))
}
