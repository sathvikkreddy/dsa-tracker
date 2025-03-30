import * as React from 'react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar'
import { GalleryVerticalEnd } from 'lucide-react'
import Link from 'next/link'
import { NavUser } from './nav-user'
import { auth } from '@/auth'

// This is sample data.
const data = {
    navMain: [
        {
            title: 'Leaderboard',
            url: '#',
            items: [
                {
                    title: 'Leaderboard',
                    url: '/leaderboard',
                    isActive: true,
                },
                {
                    title: 'Submissions',
                    url: '/submissions',
                    isActive: false,
                },
            ],
        },
    ],
}

export const AppSidebar = async ({
    ...props
}: React.ComponentProps<typeof Sidebar>) => {
    const session = await auth()
    const user = session?.user
        ? {
              email: session?.user?.email as string,
              name: session?.user?.name as string,
              avatar: session?.user?.image as string,
          }
        : null
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenuButton
                    size='lg'
                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                    <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                        <GalleryVerticalEnd className='size-4' />
                    </div>
                    <div className='flex flex-col gap-0.5 leading-none'>
                        <span className='font-medium'>DSA Tracker</span>
                    </div>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map(item => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map(item => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={item.isActive}
                                        >
                                            <Link href={item.url}>
                                                {item.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
