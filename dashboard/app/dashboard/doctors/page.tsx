import DoctorsTable from "@/components/dashboard/doctors"
import TableSkeleton from "@/components/table-skeleton"
import { Suspense } from "react"

const DoctorsPage = async () => {
    return (
        <div>
            <Suspense fallback={<TableSkeleton rows={6} columns={5} />}>
                <DoctorsTable />
            </Suspense>
        </div>
    )
}

export default DoctorsPage
