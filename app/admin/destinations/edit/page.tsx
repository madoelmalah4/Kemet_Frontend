"use client"

import { useSearchParams } from "next/navigation"
import ClientEditPage from "./ClientEditPage"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

function EditPageContent() {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    if (!id) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-red-500 font-semibold">Error: No destination ID provided.</p>
            </div>
        )
    }

    return <ClientEditPage destinationId={id} />
}

export default function EditDestinationPageWrapper() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        }>
            <EditPageContent />
        </Suspense>
    )
}
