"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useResetPasswordMutation } from "@/store/features/auth/authApi"

export default function ResetPasswordClient() {
    const searchParams = useSearchParams()
    const initialEmail = searchParams.get("email") || ""
    const [email, setEmail] = useState(initialEmail)
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const [resetPassword, { isLoading }] = useResetPasswordMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage("")
        setError("")
        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters")
            return
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match")
            return
        }
        try {
            await resetPassword({ email, otp, newPassword }).unwrap()
            setMessage("Password reset successful. Redirecting to login...")
            setTimeout(() => router.push("/login?reset=success"), 800)
        } catch (err: any) {
            setError(err?.data?.error?.message || err?.data?.message || "Reset failed. Please try again.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-8 app-surface">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="font-display text-2xl font-bold">Reset Password</h2>
                    <p className="text-gray-600">Enter the code from your email and set a new password.</p>
                </div>
                <Card className="border-none shadow-xl glass-card">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white/50" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="otp">Reset code</Label>
                                <Input id="otp" type="text" inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} required className="bg-white/50 tracking-widest" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New password</Label>
                                <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="bg-white/50" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm password</Label>
                                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="bg-white/50" />
                            </div>

                            {message && <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">{message}</div>}
                            {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">{error}</div>}

                            <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 h-12" disabled={isLoading}>
                                {isLoading ? "Resetting..." : "Reset Password"}
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
