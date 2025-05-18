import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

const DashboardPage = async () => {
    const session = await auth()
    if (!session) redirect('/')

    return (
        <div>
        </div>
    )
}

export default DashboardPage
