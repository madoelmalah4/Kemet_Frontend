import { api } from '../baseApi'

// Types
export interface Destination {
    id: string
    name: string
    city: string
    description: string
    imageUrl: string
    vrUrlImage: string
}

export interface DestinationFilters {
    search?: string
}

// Destinations API
export const destinationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Get all destinations
        getDestinations: builder.query<Destination[], void>({
            query: () => '/Destinations',
            providesTags: ['Destination'],
        }),

        // Get specific destination by ID
        getDestination: builder.query<Destination, string>({
            query: (id) => `/Destinations/${id}`,
            providesTags: (result, error, id) => [{ type: 'Destination', id }],
        }),

        // Create destination (admin only)
        createDestination: builder.mutation<Destination, Omit<Destination, 'id'>>({
            query: (destinationData) => ({
                url: '/Destinations',
                method: 'POST',
                body: destinationData,
            }),
            invalidatesTags: ['Destination'],
        }),

        // Update destination (admin only)
        updateDestination: builder.mutation<Destination, { id: string; data: Omit<Destination, 'id'> }>({
            query: ({ id, data }) => ({
                url: `/Destinations/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Destination', id },
                'Destination'
            ],
        }),

        // Delete destination (admin only)
        deleteDestination: builder.mutation<void, string>({
            query: (id) => ({
                url: `/Destinations/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Destination'],
        }),
    }),
})

export const {
    useGetDestinationsQuery,
    useGetDestinationQuery,
    useCreateDestinationMutation,
    useUpdateDestinationMutation,
    useDeleteDestinationMutation,
} = destinationsApi
