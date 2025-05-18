import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "../theme-toggle"
import { Clock } from "./clock"

export function SiteHeader() {
    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center border-b transition-[width,height] ease-linear px-4 lg:px-6">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mx-2 h-4" />
                <h1 className="text-base font-medium">Documents</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <Clock />
                <Separator orientation="vertical" className="h-4" />
                <ThemeToggle />
            </div>
        </header>
    )
}
