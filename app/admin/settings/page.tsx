"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Sliders, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function AdminSettingsPage() {
    const [platformName, setPlatformName] = useState("Egypt Explorer")
    const [supportEmail, setSupportEmail] = useState("info@egyptexplorer.com")
    const [maintenanceMode, setMaintenanceMode] = useState(false)

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="font-display text-3xl font-bold mb-2">Settings</h1>
                <p className="text-gray-500">Configure platform preferences and admin defaults.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sliders className="h-5 w-5 text-egyptian-gold" /> Platform
                            </CardTitle>
                            <CardDescription>General configuration visible across the site.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="platformName">Platform name</Label>
                                <Input
                                    id="platformName"
                                    value={platformName}
                                    onChange={(e) => setPlatformName(e.target.value)}
                                    className="bg-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="supportEmail">Support email</Label>
                                <Input
                                    id="supportEmail"
                                    type="email"
                                    value={supportEmail}
                                    onChange={(e) => setSupportEmail(e.target.value)}
                                    className="bg-white"
                                />
                            </div>

                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex items-start justify-between gap-4">
                                <div>
                                    <p className="font-medium text-gray-900">Maintenance mode</p>
                                    <p className="text-sm text-gray-500 mt-1">Temporarily show a maintenance message to visitors.</p>
                                </div>
                                <label className="inline-flex items-center gap-2 text-sm text-gray-700 select-none">
                                    <input
                                        type="checkbox"
                                        checked={maintenanceMode}
                                        onChange={(e) => setMaintenanceMode(e.target.checked)}
                                        className="h-4 w-4"
                                    />
                                    Enabled
                                </label>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-egyptian-nile" /> Security
                            </CardTitle>
                            <CardDescription>Basic security defaults (mock UI only).</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-xl border border-gray-100 bg-white p-4">
                                <p className="font-medium text-gray-900">Session policy</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    This project currently uses localStorage-based mock auth. When you add a real backend, settings here can control token expiry, refresh policy, and audit logs.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <div className="flex justify-end">
                    <Button className="bg-egyptian-gold hover:bg-egyptian-terracotta shadow-lg shadow-egyptian-gold/20">
                        <Save className="h-4 w-4 mr-2" /> Save changes
                    </Button>
                </div>
            </div>
        </div>
    )
}
