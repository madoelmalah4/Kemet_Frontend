import { Suspense } from "react"
import VerifyEmailClient from "./VerifyEmailClient"

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-8 app-surface">Loading...</div>}>
            <VerifyEmailClient />
        </Suspense>
    )
}
