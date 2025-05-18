import ArticlesTable from "@/components/dashboard/articles"
import TableSkeleton from "@/components/table-skeleton"
import { Suspense } from "react"

const ArticlesPage = () => {
    return (
        <div>
            <Suspense fallback={<TableSkeleton rows={6} columns={5} />}>
                <ArticlesTable />
            </Suspense>
        </div>
    )
}

export default ArticlesPage
