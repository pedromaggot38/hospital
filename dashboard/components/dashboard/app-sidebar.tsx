"use client"

import * as React from "react"
import {
    Command,
    HeartPulse,
    HelpCircle,
    Home,
    Newspaper,
    Settings,
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
import { User } from "@/lib/types/all"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "Usuários",
            url: "/dashboard/users",
            icon: Users,
        },
        {
            title: "Notícias",
            url: "/dashboard/articles",
            icon: Newspaper,
        },
        {
            title: "Médicos",
            url: "/dashboard/doctors",
            icon: HeartPulse,
        },
    ],
    navSecondary: [
        {
            title: "Ajuda",
            url: "#",
            icon: HelpCircle,
        },
        {
            title: "Configurações",
            url: "#",
            icon: Settings,
        },
    ],
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    user: User
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
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
                <NavUser user={{
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    active: user.active,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                }} />
            </SidebarFooter>
        </Sidebar>
    )
}
