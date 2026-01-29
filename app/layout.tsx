import type { Metadata } from "next"
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { TravelPlanProvider } from "@/contexts/TravelPlanContext"
import { AppChrome } from "@/components/shared/AppChrome"
import { ReduxProvider } from "@/store/ReduxProvider"
import { Toaster } from "@/components/ui/toaster"

const sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans"
})

const display = DM_Serif_Display({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-display"
})

export const metadata: Metadata = {
    title: "Egypt Explorer - Discover the Wonders of Egypt",
    description: "Your AI-powered guide to exploring Egypt's ancient wonders, vibrant culture, and breathtaking destinations.",
    icons: {
        icon: '/favicon.ico',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${sans.variable} ${display.variable}`}>
            <body className="font-sans antialiased">
                <ReduxProvider>
                    <AuthProvider>
                        <TravelPlanProvider>
                            <AppChrome>{children}</AppChrome>
                        </TravelPlanProvider>
                    </AuthProvider>
                </ReduxProvider>
                <Toaster />
            </body>
        </html>
    )
}
