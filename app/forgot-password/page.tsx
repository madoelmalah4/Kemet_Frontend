"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useForgotPasswordMutation } from "@/store/features/auth/authApi"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage("")
        setError("")
        try {
            const res = await forgotPassword({ email }).unwrap()
            setMessage("If the email exists, we've sent a reset code.")
            // Optionally redirect to reset page with email prefilled
            setTimeout(() => router.push(`/reset-password?email=${encodeURIComponent(email)}`), 700)
        } catch (err: any) {
            setError(err?.data?.error?.message || err?.data?.message || "Request failed. Please try again.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-8 app-surface">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="font-display text-2xl font-bold">Forgot Password</h2>
                    <p className="text-gray-600">Enter your email to receive a reset code.</p>
                </div>
                <Card className="border-none shadow-xl glass-card">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white/50" />
                            </div>

                            {message && <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">{message}</div>}
                            {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">{error}</div>}

                            <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 h-12" disabled={isLoading}>
                                {isLoading ? "Sending..." : "Send Reset Code"}
                            </Button>
                            <div className="text-center text-sm mt-2">
                                <Link href="/login" className="text-gray-500 hover:text-gray-700">Back to login</Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
