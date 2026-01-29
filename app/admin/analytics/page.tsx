"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Eye, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { userGrowthData, destinationViewsData, featureUsageData, dailyActivityData } from "@/data/analytics"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function AdminAnalyticsPage() {
    const COLORS = ["#D4AF37", "#E07A5F", "#2A6F97", "#F4E4C1"]

    return (
        <div className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="font-display text-4xl font-bold mb-2">Analytics</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Detailed insights into platform performance
                </p>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* User Growth */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <TrendingUp className="h-5 w-5 mr-2 text-egyptian-gold" />
                                User Growth Trend
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={userGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="users" stroke="#D4AF37" strokeWidth={2} name="Total Users" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Destination Views */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Eye className="h-5 w-5 mr-2 text-egyptian-terracotta" />
                                Destination Popularity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={destinationViewsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="views" fill="#E07A5F" name="Views" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Feature Usage */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-egyptian-nile" />
                                Feature Usage Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={featureUsageData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ feature, percent }) => `${feature} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="usage"
                                    >
                                        {featureUsageData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Daily Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Users className="h-5 w-5 mr-2 text-egyptian-gold" />
                                Daily Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={dailyActivityData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="activities" fill="#2A6F97" name="Activities" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Summary Stats */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Summary Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-egyptian-gold">15,420</p>
                                <p className="text-gray-600 mt-1">Total Users</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-egyptian-terracotta">45,680</p>
                                <p className="text-gray-600 mt-1">Total Views</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-egyptian-nile">33,470</p>
                                <p className="text-gray-600 mt-1">Feature Uses</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-green-600">12.5%</p>
                                <p className="text-gray-600 mt-1">Growth Rate</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
