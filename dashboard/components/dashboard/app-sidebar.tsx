"use client"

import * as React from "react"
import {
    Command,
    Home,
    HeartPulse,
    Newspaper,
    Settings,
    HelpCircle,
    Users,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { useSession } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton"

const data = {
    navMain: [
        { title: "Dashboard", url: "/dashboard", icon: Home },
        { title: "Usuários", url: "/dashboard/users", icon: Users },
        { title: "Notícias", url: "/dashboard/articles", icon: Newspaper },
        { title: "Médicos", url: "/dashboard/doctors", icon: HeartPulse },
    ],
    navSecondary: [
        { title: "Ajuda", url: "#", icon: HelpCircle },
        { title: "Configurações", url: "#", icon: Settings },
    ],
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar>

export function AppSidebar(props: AppSidebarProps) {
    const { data: session, status } = useSession()

    return (
        <Sidebar variant="sidebar" collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Hospital Maracaí</span>
                                    <span className="truncate text-xs">Organização de Saúde</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>

            <SidebarFooter>
                {status === "loading" ? (
                    <div className="flex w-full items-center space-x-2 p-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </div>
                ) : status === "authenticated" ? (
                    <NavUser />
                ) : null}
            </SidebarFooter>
        </Sidebar>
    )
}
