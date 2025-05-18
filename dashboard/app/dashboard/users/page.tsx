import UsersTable from "@/components/dashboard/users"
import TableSkeleton from "@/components/table-skeleton"
import { Suspense } from "react"

const UsersPage = async () => {
    return (
        <div>
            <Suspense fallback={<TableSkeleton rows={6} columns={5} />}>
                <UsersTable />
            </Suspense>
        </div>
    )
}

export default UsersPage
