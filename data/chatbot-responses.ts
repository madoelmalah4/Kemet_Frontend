import { ChatMessage } from "@/types"

interface ChatbotResponse {
    keywords: string[]
    response: string
}

export const chatbotResponses: ChatbotResponse[] = [
    {
        keywords: ["hello", "hi", "hey", "greetings"],
        response: "Hello! Welcome to Egypt Tourism Assistant. I'm here to help you plan your perfect Egyptian adventure. What would you like to know about?"
    },
    {
        keywords: ["pyramid", "pyramids", "giza"],
        response: "The Pyramids of Giza are Egypt's most iconic monuments! They're open daily from 8 AM to 4 PM. I recommend visiting early morning to avoid crowds and heat. Would you like to know about ticket prices or nearby attractions?"
    },
    {
        keywords: ["luxor", "valley of kings", "karnak"],
        response: "Luxor is absolutely magnificent! The Valley of the Kings houses royal tombs, while Karnak Temple is the largest religious complex ever built. I suggest spending at least 2-3 days there. Would you like help planning a Luxor itinerary?"
    },
    {
        keywords: ["weather", "temperature", "climate"],
        response: "Egypt has a desert climate. The best time to visit is October to April when temperatures are pleasant (20-25°C). Summer (May-September) can be very hot (35-40°C). Which season are you planning to visit?"
    },
    {
        keywords: ["hotel", "accommodation", "stay", "where to stay"],
        response: "Egypt offers accommodations for every budget! In Cairo, I recommend staying near the Nile or Giza. In Luxor, the East Bank has most hotels. Would you like specific hotel recommendations based on your budget?"
    },
    {
        keywords: ["food", "restaurant", "eat", "cuisine"],
        response: "Egyptian cuisine is delicious! Must-try dishes include koshari, ful medames, ta'meya (falafel), and molokhia. For authentic experiences, try local restaurants in Khan el-Khalili or along the Nile. Any dietary restrictions I should know about?"
    },
    {
        keywords: ["safe", "safety", "secure"],
        response: "Egypt is generally safe for tourists, especially in major tourist areas. Follow standard travel precautions: keep valuables secure, use registered taxis, and respect local customs. Tourist police are present at all major sites. Is there a specific safety concern?"
    },
    {
        keywords: ["visa", "passport", "entry"],
        response: "Most nationalities can get a visa on arrival at Egyptian airports for $25 USD, or apply for an e-visa online before travel. Your passport should be valid for at least 6 months. Which country are you traveling from?"
    },
    {
        keywords: ["budget", "cost", "price", "expensive"],
        response: "Egypt offers great value! A moderate budget of $50-100/day covers accommodation, meals, and attractions. Luxury travelers might spend $200+/day. Entry fees for major sites range from $10-20. Would you like a detailed budget breakdown?"
    },
    {
        keywords: ["nile", "cruise", "boat"],
        response: "A Nile cruise between Luxor and Aswan is a magical experience! Most cruises are 3-4 nights, stopping at temples along the way. The best time is October-April. Interested in cruise recommendations?"
    },
    {
        keywords: ["red sea", "diving", "snorkeling", "hurghada", "sharm"],
        response: "The Red Sea is a diver's paradise! Hurghada and Sharm El Sheikh offer world-class diving and snorkeling. The coral reefs are stunning year-round, but March-November has the best visibility. Are you a certified diver?"
    },
    {
        keywords: ["cairo", "museum", "egyptian museum"],
        response: "Cairo is vibrant and historic! Don't miss the Egyptian Museum (home to Tutankhamun's treasures), Khan el-Khalili bazaar, and Islamic Cairo. The new Grand Egyptian Museum near the pyramids is spectacular. How many days do you have in Cairo?"
    },
    {
        keywords: ["transport", "transportation", "getting around"],
        response: "In Egypt, you can use taxis (Uber works in major cities), metro in Cairo, trains between cities, or domestic flights. For tourist sites, organized tours or private drivers are most convenient. Need help with specific routes?"
    },
    {
        keywords: ["thank", "thanks"],
        response: "You're very welcome! Enjoy your Egyptian adventure. Feel free to ask if you need anything else. Safe travels! 🌟"
    }
]

export const defaultResponse = "That's an interesting question! While I can help with general Egypt tourism information, for specific details I recommend checking with local tour operators or your hotel. Is there something else about Egypt I can help you with?"

export function getChatbotResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase()

    for (const response of chatbotResponses) {
        if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return response.response
        }
    }

    return defaultResponse
}

export const mockChatHistory: ChatMessage[] = [
    {
        id: "msg-1",
        role: "assistant",
        content: "Hello! Welcome to Egypt Tourism Assistant. How can I help you plan your trip today?",
        timestamp: new Date().toISOString()
    }
]
