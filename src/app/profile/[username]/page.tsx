import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { extractProblemName } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries'
import {
    ArrowUpRight,
    Calendar,
    CheckCircle2,
    Clock,
    Code2,
    HardDrive,
    Info,
    Mail,
    User2,
    XCircle,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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

// Helper function to get status icon
const getStatusIcon = (status: string) => {
    switch (status) {
        case 'solved':
            return <CheckCircle2 className='h-4 w-4 text-green-500' />
        case 'partial':
            return <Info className='h-4 w-4 text-yellow-500' />
        default:
            return <XCircle className='h-4 w-4 text-red-500' />
    }
}
type Params = Promise<{ username: string }>

export default async function ProfilePage({ params }: { params: Params }) {
    // Fetch author data from Sanity
    const { username } = await params
    const author = await client.fetch(AUTHOR_BY_ID_QUERY, {
        username: username,
        search: null,
    })

    // If author not found, return 404
    if (!author) {
        notFound()
    }

    // Calculate submission statistics
    const totalSubmissions = author.submissions.length
    const solvedSubmissions = author.submissions.filter(
        s => s.status === 'solved'
    ).length
    const partialSubmissions = author.submissions.filter(
        s => s.status === 'partial'
    ).length
    const needsImprovementSubmissions = author.submissions.filter(
        s => s.status === 'needsImprovement'
    ).length

    const easySubmissions = author.submissions.filter(
        s => s.difficulty === 'easy'
    ).length
    const mediumSubmissions = author.submissions.filter(
        s => s.difficulty === 'medium'
    ).length
    const hardSubmissions = author.submissions.filter(
        s => s.difficulty === 'hard'
    ).length

    // Get unique tags across all submissions
    const allTags = author.submissions.flatMap(s => s.tags || [])
    const uniqueTags = [...new Set(allTags)]

    return (
        <div className='container mx-auto py-8 px-4 md:px-6'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
                {/* Profile Sidebar */}
                <div className='lg:col-span-1'>
                    <Card className='sticky top-20'>
                        <CardContent className='pt-6'>
                            <div className='flex flex-col items-center text-center gap-4'>
                                <Avatar className='h-32 w-32 mb-4'>
                                    <AvatarImage
                                        src={author.image ?? undefined}
                                        alt={author.name ?? 'user'}
                                    />
                                    <AvatarFallback className='text-2xl'>
                                        {author.name
                                            ?.substring(0, 2)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <h1 className='text-2xl font-bold'>
                                    @{author.name}
                                </h1>

                                {author.email && (
                                    <div className='flex items-center text-sm text-muted-foreground '>
                                        <Mail className='h-4 w-4 mr-1' />
                                        <span>{author.email}</span>
                                    </div>
                                )}

                                {author.bio && (
                                    <p className='text-sm text-muted-foreground '>
                                        {author.bio}
                                    </p>
                                )}
                            </div>

                            <Separator className='my-6' />

                            <div>
                                <h3 className='text-lg font-semibold mb-4'>
                                    Submission Stats
                                </h3>
                                <div className='space-y-2'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-sm flex items-center'>
                                            <Badge className='bg-green-100 text-green-800 mr-2'>
                                                Solved
                                            </Badge>
                                        </span>
                                        <span className='text-sm font-medium'>
                                            {solvedSubmissions}
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-sm flex items-center'>
                                            <Badge className='bg-yellow-100 text-yellow-800 mr-2'>
                                                Partial
                                            </Badge>
                                        </span>
                                        <span className='text-sm font-medium'>
                                            {partialSubmissions}
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-sm flex items-center'>
                                            <Badge className='bg-red-100 text-red-800 mr-2'>
                                                Needs Improvement
                                            </Badge>
                                        </span>
                                        <span className='text-sm font-medium'>
                                            {needsImprovementSubmissions}
                                        </span>
                                    </div>
                                </div>

                                <h4 className='text-sm font-medium mt-6 mb-2'>
                                    By Difficulty
                                </h4>
                                <div className='space-y-2'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-sm flex items-center'>
                                            <Badge className='bg-green-100 text-green-800 mr-2'>
                                                Easy
                                            </Badge>
                                        </span>
                                        <span className='text-sm font-medium'>
                                            {easySubmissions}
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-sm flex items-center'>
                                            <Badge className='bg-yellow-100 text-yellow-800 mr-2'>
                                                Medium
                                            </Badge>
                                        </span>
                                        <span className='text-sm font-medium'>
                                            {mediumSubmissions}
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-sm flex items-center'>
                                            <Badge className='bg-red-100 text-red-800 mr-2'>
                                                Hard
                                            </Badge>
                                        </span>
                                        <span className='text-sm font-medium'>
                                            {hardSubmissions}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {uniqueTags.length > 0 && (
                                <>
                                    <Separator className='my-6' />
                                    <div>
                                        <h4 className='text-sm font-medium mb-2'>
                                            Frequently Used Tags
                                        </h4>
                                        <div className='flex flex-wrap gap-2'>
                                            {uniqueTags
                                                .slice(0, 10)
                                                .map((tag, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant='outline'
                                                        className='text-xs'
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className='lg:col-span-3'>
                    <Tabs defaultValue='submissions' className='w-full'>
                        <TabsList className='grid w-full grid-cols-2 mb-8'>
                            <TabsTrigger value='submissions'>
                                Submissions
                            </TabsTrigger>
                            <TabsTrigger value='activity'>Activity</TabsTrigger>
                        </TabsList>

                        <TabsContent value='submissions' className='space-y-6'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-2xl font-bold'>
                                    Submissions ({totalSubmissions})
                                </h2>
                            </div>

                            {author.submissions.length > 0 ? (
                                <div className='space-y-4'>
                                    {author.submissions.map(submission => (
                                        <Link
                                            href={`/submissions/${submission._id}`}
                                            key={submission._id}
                                        >
                                            <Card className='hover:shadow-md transition-shadow'>
                                                <CardContent className='p-0'>
                                                    <div className='flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4'>
                                                        <div className='flex-1'>
                                                            <div className='flex items-center gap-2 mb-1'>
                                                                <h3 className='font-semibold'>
                                                                    {extractProblemName(
                                                                        submission.submissionLink
                                                                    )}
                                                                </h3>
                                                                {submission.difficulty && (
                                                                    <Badge
                                                                        className={getDifficultyColor(
                                                                            submission.difficulty
                                                                        )}
                                                                    >
                                                                        {
                                                                            submission.difficulty
                                                                        }
                                                                    </Badge>
                                                                )}
                                                            </div>

                                                            <div className='flex flex-wrap gap-2 mb-2'>
                                                                {submission.tags &&
                                                                    submission.tags
                                                                        .slice(
                                                                            0,
                                                                            3
                                                                        )
                                                                        .map(
                                                                            (
                                                                                tag,
                                                                                index
                                                                            ) => (
                                                                                <Badge
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    variant='outline'
                                                                                    className='text-xs'
                                                                                >
                                                                                    {
                                                                                        tag
                                                                                    }
                                                                                </Badge>
                                                                            )
                                                                        )}
                                                                {submission.tags &&
                                                                    submission
                                                                        .tags
                                                                        .length >
                                                                        3 && (
                                                                        <Badge
                                                                            variant='outline'
                                                                            className='text-xs'
                                                                        >
                                                                            +
                                                                            {submission
                                                                                .tags
                                                                                .length -
                                                                                3}{' '}
                                                                            more
                                                                        </Badge>
                                                                    )}
                                                            </div>

                                                            <div className='flex items-center text-sm text-muted-foreground'>
                                                                <Calendar className='h-3 w-3 mr-1' />
                                                                <span>
                                                                    {submission.submittedAt
                                                                        ? formatDate(
                                                                              submission.submittedAt
                                                                          )
                                                                        : 'No date'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2'>
                                                            <div className='flex items-center'>
                                                                <div className='flex items-center mr-3'>
                                                                    <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
                                                                    <span className='text-xs text-muted-foreground'>
                                                                        {submission.timeComplexity ||
                                                                            'N/A'}
                                                                    </span>
                                                                </div>
                                                                <div className='flex items-center'>
                                                                    <HardDrive className='h-4 w-4 mr-1 text-muted-foreground' />
                                                                    <span className='text-xs text-muted-foreground'>
                                                                        {submission.spaceComplexity ||
                                                                            'N/A'}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className='flex items-center gap-2 ml-0 sm:ml-4'>
                                                                {submission.status && (
                                                                    <Badge
                                                                        className={getStatusColor(
                                                                            submission.status
                                                                        )}
                                                                    >
                                                                        <span className='flex items-center'>
                                                                            {getStatusIcon(
                                                                                submission.status
                                                                            )}
                                                                            <span className='ml-1'>
                                                                                {
                                                                                    submission.status
                                                                                }
                                                                            </span>
                                                                        </span>
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className='flex flex-col items-center justify-center py-12'>
                                        <Code2 className='h-12 w-12 text-muted-foreground mb-4' />
                                        <h3 className='text-xl font-medium'>
                                            No submissions yet
                                        </h3>
                                        <p className='text-muted-foreground mb-4'>
                                            {
                                                "This user hasn't submitted any solutions yet."
                                            }
                                        </p>
                                        <Button>
                                            <Link href='/submissions/new'>
                                                Create First Submission
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value='activity'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Activity Timeline</CardTitle>
                                    <CardDescription>
                                        Recent activity and contributions
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {author.submissions.length > 0 ? (
                                        <div className='relative pl-6 border-l'>
                                            {author.submissions
                                                .slice(0, 10)
                                                .map((submission, index) => (
                                                    <div
                                                        key={index}
                                                        className='mb-8 relative'
                                                    >
                                                        {submission.status && (
                                                            <div className='absolute -left-[25px] p-1 bg-background border rounded-full'>
                                                                {getStatusIcon(
                                                                    submission.status
                                                                )}
                                                            </div>
                                                        )}
                                                        <div className='text-sm text-muted-foreground mb-1'>
                                                            {submission.submittedAt
                                                                ? formatDate(
                                                                      submission.submittedAt
                                                                  )
                                                                : 'No date'}
                                                        </div>
                                                        <div className='flex items-center gap-2'>
                                                            <h4 className='font-medium'>
                                                                {
                                                                    submission.problem
                                                                }
                                                            </h4>
                                                            {submission.difficulty && (
                                                                <Badge
                                                                    className={getDifficultyColor(
                                                                        submission.difficulty
                                                                    )}
                                                                >
                                                                    {
                                                                        submission.difficulty
                                                                    }
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className='flex items-center mt-1'>
                                                            <Link
                                                                href={`/submissions/${submission._id}`}
                                                                className='text-sm text-primary flex items-center hover:underline'
                                                            >
                                                                View submission{' '}
                                                                <ArrowUpRight className='h-3 w-3 ml-1' />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    ) : (
                                        <div className='text-center py-12'>
                                            <User2 className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                                            <h3 className='text-xl font-medium'>
                                                No activity yet
                                            </h3>
                                            <p className='text-muted-foreground'>
                                                {
                                                    "This user hasn't recorded any activity yet."
                                                }
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
