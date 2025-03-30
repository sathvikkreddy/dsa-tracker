'use client'

import { usePathname } from 'next/navigation'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface BreadcrumbSegment {
    label: string
    href: string
    isCurrentPage: boolean
}

export function DynamicBreadcrumb() {
    const pathname = usePathname()

    // Convert URL path to breadcrumb segments
    const generateBreadcrumbs = (): BreadcrumbSegment[] => {
        // Skip empty segments and remove query parameters
        const segments = pathname.split('/').filter(Boolean)

        if (segments.length === 0) {
            return [
                { label: 'Home', href: '/leaderboard', isCurrentPage: true },
            ]
        }

        // Build up breadcrumb segments with proper URLs
        return [
            { label: 'Home', href: '/', isCurrentPage: false },
            ...segments.map((segment, index) => {
                // Create a path for this segment by joining all segments up to current
                const href = `/${segments.slice(0, index + 1).join('/')}`

                // Format the segment for display (convert dashes to spaces, capitalize)
                const label = segment
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, char => char.toUpperCase())

                // Check if this is the current page (last segment)
                const isCurrentPage = index === segments.length - 1

                return { label, href, isCurrentPage }
            }),
        ]
    }

    const breadcrumbs = generateBreadcrumbs()

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                    <div key={breadcrumb.href} className='flex items-center'>
                        <BreadcrumbItem>
                            {breadcrumb.isCurrentPage ? (
                                <BreadcrumbPage>
                                    {breadcrumb.label}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={breadcrumb.href}>
                                    {breadcrumb.label}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>

                        {/* Add separator between items, but not after the last one */}
                        {index < breadcrumbs.length - 1 && (
                            <BreadcrumbSeparator />
                        )}
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
