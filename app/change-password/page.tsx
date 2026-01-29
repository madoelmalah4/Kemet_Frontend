"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useChangePasswordMutation } from "@/store/features/auth/authApi"
import { useAuth } from "@/contexts/AuthContext"

export default function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const [changePassword, { isLoading }] = useChangePasswordMutation()
    const { isAuthenticated } = useAuth()

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
            await changePassword({ currentPassword, newPassword }).unwrap()
            setMessage("Password changed successfully.")
            setTimeout(() => router.push("/dashboard"), 800)
        } catch (err: any) {
            setError(err?.data?.error?.message || err?.data?.message || "Change password failed. Please try again.")
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 app-surface">
                <div className="text-center">
                    <p className="mb-4">You need to be logged in to change your password.</p>
                    <Link href="/login" className="text-blue-600 hover:text-blue-700">Go to login</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-8 app-surface">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="font-display text-2xl font-bold">Change Password</h2>
                    <p className="text-gray-600">Update your account password.</p>
                </div>
                <Card className="border-none shadow-xl glass-card">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current password</Label>
                                <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="bg-white/50" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New password</Label>
                                <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="bg-white/50" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm new password</Label>
                                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="bg-white/50" />
                            </div>

                            {message && <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">{message}</div>}
                            {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">{error}</div>}

                            <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 h-12" disabled={isLoading}>
                                {isLoading ? "Saving..." : "Change Password"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
