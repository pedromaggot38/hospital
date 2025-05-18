
import { Skeleton } from "@/components/ui/skeleton"

const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => {
    return (
        <div className="space-y-4">
            <Skeleton className="h-18 w-full" />

            {[...Array(rows)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex space-x-4">
                    {[...Array(columns)].map((_, colIndex) => (
                        <Skeleton key={colIndex} className="h-4 w-[120px]" />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default TableSkeleton
