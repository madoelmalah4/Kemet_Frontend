import { TranslationPhrase } from "@/types"

export const commonPhrases: TranslationPhrase[] = [
    {
        id: "p1",
        english: "Hello",
        arabic: "مرحبا",
        category: "Greetings",
        pronunciation: "Marhaba"
    },
    {
        id: "p2",
        english: "Good morning",
        arabic: "صباح الخير",
        category: "Greetings",
        pronunciation: "Sabah el kheir"
    },
    {
        id: "p3",
        english: "Good evening",
        arabic: "مساء الخير",
        category: "Greetings",
        pronunciation: "Masa el kheir"
    },
    {
        id: "p4",
        english: "Thank you",
        arabic: "شكرا",
        category: "Courtesy",
        pronunciation: "Shukran"
    },
    {
        id: "p5",
        english: "You're welcome",
        arabic: "عفوا",
        category: "Courtesy",
        pronunciation: "Afwan"
    },
    {
        id: "p6",
        english: "Please",
        arabic: "من فضلك",
        category: "Courtesy",
        pronunciation: "Min fadlak"
    },
    {
        id: "p7",
        english: "Excuse me",
        arabic: "لو سمحت",
        category: "Courtesy",
        pronunciation: "Law samaht"
    },
    {
        id: "p8",
        english: "Yes",
        arabic: "نعم",
        category: "Basic",
        pronunciation: "Na'am"
    },
    {
        id: "p9",
        english: "No",
        arabic: "لا",
        category: "Basic",
        pronunciation: "La"
    },
    {
        id: "p10",
        english: "How much?",
        arabic: "بكام؟",
        category: "Shopping",
        pronunciation: "Bekam?"
    },
    {
        id: "p11",
        english: "Where is...?",
        arabic: "فين...؟",
        category: "Directions",
        pronunciation: "Fein...?"
    },
    {
        id: "p12",
        english: "I don't understand",
        arabic: "أنا مش فاهم",
        category: "Basic",
        pronunciation: "Ana mesh fahem"
    },
    {
        id: "p13",
        english: "Do you speak English?",
        arabic: "بتتكلم إنجليزي؟",
        category: "Basic",
        pronunciation: "Betetkalem Englizi?"
    },
    {
        id: "p14",
        english: "Water",
        arabic: "مياه",
        category: "Food & Drink",
        pronunciation: "Mayya"
    },
    {
        id: "p15",
        english: "Food",
        arabic: "أكل",
        category: "Food & Drink",
        pronunciation: "Akl"
    },
    {
        id: "p16",
        english: "Restaurant",
        arabic: "مطعم",
        category: "Food & Drink",
        pronunciation: "Mat'am"
    },
    {
        id: "p17",
        english: "Hotel",
        arabic: "فندق",
        category: "Accommodation",
        pronunciation: "Funduq"
    },
    {
        id: "p18",
        english: "Taxi",
        arabic: "تاكسي",
        category: "Transportation",
        pronunciation: "Taxi"
    },
    {
        id: "p19",
        english: "Airport",
        arabic: "مطار",
        category: "Transportation",
        pronunciation: "Matar"
    },
    {
        id: "p20",
        english: "Help!",
        arabic: "النجدة!",
        category: "Emergency",
        pronunciation: "El nagda!"
    },
    {
        id: "p21",
        english: "Doctor",
        arabic: "دكتور",
        category: "Emergency",
        pronunciation: "Doktor"
    },
    {
        id: "p22",
        english: "Police",
        arabic: "بوليس",
        category: "Emergency",
        pronunciation: "Bolis"
    },
    {
        id: "p23",
        english: "Beautiful",
        arabic: "جميل",
        category: "Compliments",
        pronunciation: "Gameel"
    },
    {
        id: "p24",
        english: "Delicious",
        arabic: "لذيذ",
        category: "Food & Drink",
        pronunciation: "Lazeez"
    },
    {
        id: "p25",
        english: "Goodbye",
        arabic: "مع السلامة",
        category: "Greetings",
        pronunciation: "Ma'a salama"
    }
]

export function getPhrasesByCategory(category: string): TranslationPhrase[] {
    return commonPhrases.filter(p => p.category === category)
}

export function getAllCategories(): string[] {
    return Array.from(new Set(commonPhrases.map(p => p.category)))
}
