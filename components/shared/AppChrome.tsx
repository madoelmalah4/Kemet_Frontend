"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/shared/Navbar"
import { Footer } from "@/components/shared/Footer"

export function AppChrome({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const hidePublicChrome = pathname.startsWith("/admin") || pathname.startsWith("/dashboard")

    if (hidePublicChrome) {
        return <>{children}</>
    }

    return (
        <div className="app-surface flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}
