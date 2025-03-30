import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import { SUBMISSIONS_GROUPED_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import { differenceInDays } from 'date-fns'
import { Star } from 'lucide-react'
import Link from 'next/link'

const Leaderboard = async () => {
    const authorsWithSubmissions = await client.fetch(
        SUBMISSIONS_GROUPED_BY_AUTHOR_QUERY,
        { search: null }
    )
    return (
        <div className='flex justify-center my-4'>
            {authorsWithSubmissions.authors.map((author, index) => {
                let hasStar = false
                if (
                    author.submissions[0] &&
                    author.submissions[0].submittedAt
                ) {
                    hasStar =
                        differenceInDays(
                            new Date(),
                            new Date(author.submissions[0].submittedAt)
                        ) <= 1
                }
                return (
                    author.username && (
                        <LeaderboardItem
                            key={index}
                            hasStar={hasStar}
                            position={index + 1}
                            author={{
                                username: author.username,
                                image: author.image,
                            }}
                            submissionsCount={author.submissions.length}
                            className='w-3/4'
                        />
                    )
                )
            })}
        </div>
    )
}

const LeaderboardItem = (props: LeaderboardItemProps) => {
    const { position, author, submissionsCount, hasStar, className } = props

    // Determine background color based on position
    const getBgColor = () => {
        switch (position) {
            case 1:
                return 'bg-amber-100 border-amber-400'
            case 2:
                return 'bg-slate-100 border-slate-300'
            case 3:
                return 'bg-orange-100 border-orange-300'
            default:
                return 'bg-white border-gray-200'
        }
    }

    // Determine medal emoji based on position
    const getMedal = () => {
        switch (position) {
            case 1:
                return '🥇'
            case 2:
                return '🥈'
            case 3:
                return '🥉'
            default:
                return position
        }
    }

    return (
        <Link
            href={`/profile/${author.username}`}
            className={cn(
                'flex justify-between p-4 items-center rounded-lg border-2 mb-3 transition-all hover:shadow-md',
                getBgColor(),
                className
            )}
        >
            <div className='flex items-center gap-4'>
                <div className='text-xl font-bold w-8 flex justify-center'>
                    {getMedal()}
                </div>
                <div className='relative'>
                    <Avatar className='h-16 w-16 rounded-lg border-2 border-gray-200'>
                        <AvatarImage
                            src={author.image ?? undefined}
                            alt={author.username}
                        />
                        <AvatarFallback className='rounded-lg bg-primary/10'>
                            {author.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {hasStar && (
                        <Star
                            className='absolute -top-2 -right-2 fill-yellow-400 text-yellow-400'
                            size={20}
                        />
                    )}
                </div>
                <div className='flex flex-col'>
                    <span className='font-semibold'>{author.username}</span>
                    <span className='text-sm text-gray-500'>
                        {'Submissions: ' + submissionsCount}
                    </span>
                </div>
            </div>
            <div className='hidden sm:block text-sm font-medium bg-primary/10 px-3 py-1 rounded-full'>
                {submissionsCount}{' '}
                {submissionsCount === 1 ? 'submission' : 'submissions'}
            </div>
        </Link>
    )
}
type LeaderboardItemProps = {
    position: number
    hasStar: boolean
    author: { username: string; image: string | null }
    submissionsCount: number
    className?: string
}

export default Leaderboard
