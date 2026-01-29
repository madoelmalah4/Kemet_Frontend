"use client"

import { useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useVerifyEmailMutation, useResendOtpMutation } from "@/store/features/auth/authApi"

export default function VerifyEmailClient() {
    const searchParams = useSearchParams()
    const initialEmail = searchParams.get("email") || ""
    const [email, setEmail] = useState(initialEmail)
    const [otp, setOtp] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation()
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation()

    const canSubmit = useMemo(() => email && otp.length === 6, [email, otp])

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setMessage("")
        try {
            const res = await verifyEmail({ email, otp }).unwrap()
            setMessage(res.message || "Email verified successfully.")
            setTimeout(() => router.push("/login?verified=true"), 700)
        } catch (err: any) {
            setError(err?.data?.error?.message || err?.data?.message || "Verification failed. Please try again.")
        }
    }

    const handleResend = async () => {
        setError("")
        setMessage("")
        try {
            const res = await resendOtp({ email }).unwrap()
            setMessage(res.message || "OTP resent successfully.")
        } catch (err: any) {
            setError(err?.data?.error?.message || err?.data?.message || "Failed to resend OTP. Please try again later.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-8 app-surface">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="font-display text-2xl font-bold tracking-tight mb-2">Verify your email</h2>
                    <p className="text-gray-600">We sent a 6-digit code to your email. Enter it below to complete your registration.</p>
                </div>

                <Card className="border-none shadow-xl glass-card">
                    <CardContent className="pt-6">
                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-white/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="otp">Verification code</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="Enter 6-digit code"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    required
                                    className="bg-white/50 tracking-widest text-center"
                                />
                            </div>

                            {message && (
                                <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 h-12" disabled={!canSubmit || isLoading}>
                                {isLoading ? "Verifying..." : "Verify Email"}
                            </Button>

                            <div className="flex items-center justify-between text-sm">
                                <button type="button" onClick={handleResend} disabled={isResending} className="text-blue-600 hover:text-blue-700">
                                    {isResending ? "Resending..." : "Resend code"}
                                </button>
                                <Link href="/login" className="text-gray-500 hover:text-gray-700">Back to login</Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
