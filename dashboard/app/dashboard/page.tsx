import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

const DashboardPage = async () => {
    const session = await auth()
    if (!session) redirect('/')

    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    )
}

export default DashboardPage
