import ClientEditPage from "./ClientEditPage"
import { destinations } from "@/data/destinations"

export function generateStaticParams() {
    return destinations.map((destination: any) => ({
        id: destination.id,
    }))
}

export default function EditDestinationPageWrapper({ params }: { params: { id: string } }) {
    return <ClientEditPage params={params} />
}
