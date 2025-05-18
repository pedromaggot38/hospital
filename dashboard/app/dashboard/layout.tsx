import { AppSidebar } from '@/components/side-bar-dashboard/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { auth } from '@/lib/auth'
import db from '@/lib/db'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth()

    if (!session || !session.user?.id) {
        return null
    }

    const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            image: true,
            role: true
        }
    })

    if (!user) {
        return null
    }

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <div>
                <SidebarTrigger />
                {children}
            </div>
        </SidebarProvider>
    )
}

export default Layout
