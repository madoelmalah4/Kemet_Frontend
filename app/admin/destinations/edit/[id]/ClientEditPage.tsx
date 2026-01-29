"use client"

import { useEffect } from "react"
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
import { useUpdateDestinationMutation, useGetDestinationQuery } from "@/store/features/destinations/destinationsApi"

const destinationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    imageUrl: z.string().url("Please enter a valid image URL"),
    vrUrlImage: z.string().optional().or(z.literal("")),
})

type DestinationFormValues = z.infer<typeof destinationSchema>

export default function EditDestinationPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { toast } = useToast()
    const { data: destination, isLoading: isFetching } = useGetDestinationQuery(params.id)
    const [updateDestination, { isLoading: isUpdating }] = useUpdateDestinationMutation()

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

    // Reset form with data when loaded
    useEffect(() => {
        if (destination) {
            form.reset({
                name: destination.name,
                city: destination.city,
                description: destination.description,
                imageUrl: destination.imageUrl,
                vrUrlImage: destination.vrUrlImage || "",
            })
        }
    }, [destination, form])

    const onSubmit = async (data: DestinationFormValues) => {
        try {
            await updateDestination({
                id: params.id,
                data: {
                    ...data,
                    vrUrlImage: data.vrUrlImage || "",
                },
            }).unwrap()

            toast({
                title: "Success",
                description: "Destination updated successfully",
            })
            router.push("/admin/destinations")
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update destination",
                variant: "destructive",
            })
        }
    }

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-egyptian-gold" />
            </div>
        )
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
                    <h1 className="text-3xl font-display font-bold text-gray-900">Edit Destination</h1>
                    <p className="text-gray-500">Update destination details</p>
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
                                    disabled={isUpdating}
                                    className="relative px-6 py-2.5 rounded-xl font-medium text-white 
               bg-gradient-to-r from-egyptian-nile to-blue-600 
               hover:from-blue-600 hover:to-egyptian-nile
               transition-all duration-300 shadow-md hover:shadow-lg 
               disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isUpdating ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Updating...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Save className="w-4 h-4" />
                                            Update Destination
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
