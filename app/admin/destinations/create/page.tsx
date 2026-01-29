"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useCreateDestinationMutation } from "@/store/features/destinations/destinationsApi"

const destinationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    imageUrl: z.string().url("Please enter a valid image URL"),
    vrUrlImage: z.string().optional().or(z.literal("")),
})

type DestinationFormValues = z.infer<typeof destinationSchema>

export default function CreateDestinationPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [createDestination, { isLoading }] = useCreateDestinationMutation()

    const form = useForm<DestinationFormValues>({
        resolver: zodResolver(destinationSchema),
        defaultValues: {
            name: "",
            city: "",
            description: "",
            imageUrl: "",
            vrUrlImage: "",
        },
    })

    const onSubmit = async (data: DestinationFormValues) => {
        try {
            await createDestination({
                ...data,
                vrUrlImage: data.vrUrlImage || "", // Ensure empty string if undefined
            }).unwrap()

            toast({
                title: "Success",
                description: "Destination created successfully",
            })
            router.push("/admin/destinations")
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create destination",
                variant: "destructive",
            })
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center gap-4">
                <Link href="/admin/destinations">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-900">Create Destination</h1>
                    <p className="text-gray-500">Add a new destination to the catalog</p>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm max-w-2xl">
                <CardHeader>
                    <CardTitle>Destination Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Pyramids of Giza" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Cairo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="vrUrlImage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>VR Tour URL (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Provide a detailed description..."
                                                className="min-h-[150px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="relative px-6 py-2.5 rounded-xl font-medium text-white 
               bg-gradient-to-r from-egyptian-nile to-blue-600 
               hover:from-blue-600 hover:to-egyptian-nile
               transition-all duration-300 shadow-md hover:shadow-lg 
               disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Creating...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Save className="w-4 h-4" />
                                            Create Destination
                                        </span>
                                    )}
                                </Button>
                            </div>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </motion.div>
    )
}
