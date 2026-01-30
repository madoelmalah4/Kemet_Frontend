"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Home, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
                    <div className="relative flex justify-center">
                        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-slate-100 rotate-12">
                            <Compass className="w-12 h-12 text-blue-600 animate-pulse" />
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-3">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-7xl font-display font-bold text-slate-900"
                    >
                        404
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-semibold text-slate-800"
                    >
                        Lost in the Sands
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600"
                    >
                        The page you are looking for has been buried by time, or it never existed in our archives.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button
                        variant="default"
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                    <Link href="/">
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto border-2 border-slate-200 hover:bg-slate-50 rounded-xl"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Take Me Home
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-8"
                >
                    <p className="text-sm text-slate-400 font-medium">
                        KEMET EXPLORER &bull; ANCIENT MODERNITY
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
