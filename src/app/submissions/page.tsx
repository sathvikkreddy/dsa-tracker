import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { client } from '@/sanity/lib/client'
import { SUBMISSIONS_QUERY } from '@/sanity/lib/queries'
import { Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Helper function to format date
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

// Helper function to get difficulty color
const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'Easy':
            return 'bg-green-100 text-green-800'
        case 'Medium':
            return 'bg-yellow-100 text-yellow-800'
        case 'Hard':
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

// Helper function to get status color
const getStatusColor = (status: string) => {
    switch (status) {
        case 'Accepted':
            return 'bg-green-100 text-green-800'
        case 'Rejected':
            return 'bg-red-100 text-red-800'
        case 'Pending':
            return 'bg-blue-100 text-blue-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

export default async function SubmissionsPage() {
    // Fetch submissions from Sanity
    const submissions = await client.fetch(SUBMISSIONS_QUERY, { search: null })

    return (
        <div className='container mx-auto p-8'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold'>Submissions</h1>
                <Button>
                    <Link href='/submissions/new'>New Submission</Link>
                </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {submissions.map(submission => (
                    <Link
                        href={`/submissions/${submission._id}`}
                        key={submission._id}
                    >
                        <Card className='h-full hover:shadow-md transition-shadow'>
                            <CardHeader className='pb-2'>
                                <div className='flex justify-between items-start'>
                                    <CardTitle className='text-lg line-clamp-1'>
                                        {submission.problem}
                                    </CardTitle>
                                    <Badge
                                        className={getDifficultyColor(
                                            submission.difficulty ?? ''
                                        )}
                                    >
                                        {submission.difficulty}
                                    </Badge>
                                </div>
                                <div className='flex items-center text-sm text-muted-foreground mt-1'>
                                    <Calendar className='h-4 w-4 mr-1' />
                                    {submission.submittedAt
                                        ? formatDate(submission.submittedAt)
                                        : 'No date'}
                                </div>
                            </CardHeader>

                            <CardContent className='pb-2'>
                                <div className='flex items-center mb-3'>
                                    <Avatar className='h-8 w-8 mr-2'>
                                        <AvatarImage
                                            src={
                                                submission.author?.image ??
                                                undefined
                                            }
                                            alt={
                                                submission.author?.name ??
                                                'username'
                                            }
                                        />
                                        <AvatarFallback>
                                            {submission.author?.name
                                                ?.substring(0, 2)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className='text-sm font-medium'>
                                        {submission.author?.username}
                                    </span>
                                </div>

                                <div className='flex flex-wrap gap-2 mb-3'>
                                    {submission.tags &&
                                        submission.tags
                                            .slice(0, 3)
                                            .map((tag, index) => (
                                                <Badge
                                                    key={index}
                                                    variant='outline'
                                                    className='text-xs'
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                    {submission.tags &&
                                        submission.tags.length > 3 && (
                                            <Badge
                                                variant='outline'
                                                className='text-xs'
                                            >
                                                +{submission.tags.length - 3}{' '}
                                                more
                                            </Badge>
                                        )}
                                </div>

                                <div className='line-clamp-2 text-sm text-muted-foreground'>
                                    {extractProblemName(
                                        submission.submissionLink ?? ''
                                    ) || 'No intuition provided'}
                                </div>
                            </CardContent>

                            <CardFooter className='flex justify-between pt-2'>
                                <Badge
                                    className={getStatusColor(
                                        submission.status ?? ''
                                    )}
                                >
                                    {submission.status}
                                </Badge>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className='gap-1'
                                >
                                    View Details{' '}
                                    <ChevronRight className='h-4 w-4' />
                                </Button>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>

            {submissions.length === 0 && (
                <div className='text-center py-12'>
                    <h3 className='text-xl font-medium text-muted-foreground'>
                        No submissions found
                    </h3>
                    <p className='mt-2 text-muted-foreground'>
                        Be the first to submit a solution!
                    </p>
                </div>
            )}
        </div>
    )
}

function extractProblemName(url: string) {
    // Regular expression to match the problem name after "problems/"
    const regex = /problems\/([a-zA-Z-]+)/

    // Execute the regular expression
    const match = url.match(regex)

    // If a match is found, return the problem name; otherwise, return null
    return match ? match[1] : null
}
