
import ClientDestination from "./ClientDestination"
import { destinations } from "@/data/destinations"

export function generateStaticParams() {
    return destinations.map((destination) => ({
        slug: destination.id,
    }))
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
    // We treat the slug as the ID because the API requires ID and we changed the routes to link to ID.
    return <ClientDestination destinationId={params.slug} />
}
