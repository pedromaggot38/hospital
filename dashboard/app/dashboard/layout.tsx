import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SiteHeader } from '@/components/dashboard/site-header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { auth } from '@/lib/auth'
import db from '@/lib/db'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth()
    if (!session || !session.user?.id) {
        redirect('/')
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
            <div className="flex-grow">
                <SiteHeader />
                <div className="container mx-auto px-4">
                    {children}
                </div>
            </div>
        </SidebarProvider >
    )
}

export default Layout
