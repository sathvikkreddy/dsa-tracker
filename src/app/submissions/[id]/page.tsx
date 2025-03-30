import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { client } from '@/sanity/lib/client'
import { SUBMISSION_BY_ID_QUERY } from '@/sanity/lib/queries'
import {
    Calendar,
    Clock,
    Code,
    ExternalLink,
    FileCode,
    HardDrive,
    Link2,
    User,
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
type Params = Promise<{ id: string }>

export default async function SubmissionDetailPage({
    params,
}: {
    params: Params
}) {
    // Fetch submission details from Sanity
    const { id } = await params
    const submission = await client.fetch(SUBMISSION_BY_ID_QUERY, {
        id: id,
    })

    // If submission not found, return 404
    if (!submission) {
        notFound()
    }

    return (
        <div className='container mx-auto p-8'>
            <div className='mb-6'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div>
                        <h1 className='text-3xl font-bold'>
                            {submission.problem}
                        </h1>
                        <div className='flex items-center mt-2 text-muted-foreground'>
                            <Calendar className='h-4 w-4 mr-1' />
                            <span className='text-sm'>
                                {submission.submittedAt
                                    ? formatDate(submission.submittedAt)
                                    : 'No date'}
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                        {submission.difficulty && (
                            <Badge
                                className={getDifficultyColor(
                                    submission.difficulty
                                )}
                            >
                                {submission.difficulty}
                            </Badge>
                        )}
                        {submission.status && (
                            <Badge
                                className={getStatusColor(submission.status)}
                            >
                                {submission.status}
                            </Badge>
                        )}
                        <a
                            href={`https://leetcode.com/problems/${extractProblemName(submission.submissionLink ?? '')}`}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <Button
                                variant='outline'
                                size='sm'
                                className='gap-1'
                            >
                                Problem <ExternalLink className='h-3 w-3' />
                            </Button>
                        </a>
                        <Link
                            href={submission.submissionLink ?? '#'}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <Button
                                variant='outline'
                                size='sm'
                                className='gap-1'
                            >
                                Solution <ExternalLink className='h-3 w-3' />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                {/* Author information sidebar */}
                <div className='lg:col-span-1'>
                    <Card>
                        <CardContent className='pt-6'>
                            <div className='flex flex-col items-center text-center gap-4'>
                                <Avatar className='h-20 w-20'>
                                    <AvatarImage
                                        src={
                                            submission.author?.image ??
                                            undefined
                                        }
                                        alt={submission.author?.name ?? 'user'}
                                    />
                                    <AvatarFallback>
                                        {submission.author?.name
                                            ?.substring(0, 2)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className='font-semibold text-lg'>
                                    @{submission.author?.name}
                                </h3>
                                {submission.author?.bio && (
                                    <p className='mt-4 text-sm text-muted-foreground'>
                                        {submission.author.bio}
                                    </p>
                                )}

                                <Link
                                    href={`/profile/${submission.author?.username}`}
                                >
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        className='mt-4'
                                    >
                                        View Profile
                                    </Button>
                                </Link>
                            </div>

                            <Separator className='my-6' />

                            <div className='space-y-4'>
                                <div className='flex items-center gap-2'>
                                    <Clock className='h-4 w-4 text-muted-foreground' />
                                    <div>
                                        <p className='text-sm font-medium'>
                                            Time Complexity
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            {submission.timeComplexity ||
                                                'Not specified'}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <HardDrive className='h-4 w-4 text-muted-foreground' />
                                    <div>
                                        <p className='text-sm font-medium'>
                                            Space Complexity
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            {submission.spaceComplexity ||
                                                'Not specified'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {submission.tags && submission.tags.length > 0 && (
                                <>
                                    <Separator className='my-6' />
                                    <div>
                                        <h4 className='text-sm font-medium mb-2'>
                                            Tags
                                        </h4>
                                        <div className='flex flex-wrap gap-2'>
                                            {submission.tags.map(
                                                (tag, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant='outline'
                                                        className='text-xs'
                                                    >
                                                        {tag}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Main content */}
                <div className='lg:col-span-3'>
                    <Tabs defaultValue='approach' className='w-full'>
                        <TabsList className='grid grid-cols-3 mb-6'>
                            <TabsTrigger value='approach'>Approach</TabsTrigger>
                            <TabsTrigger value='code'>
                                Code Snippets
                            </TabsTrigger>
                            <TabsTrigger value='additional'>
                                Additional Info
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value='approach' className='space-y-6'>
                            <Card>
                                <CardContent className='pt-6'>
                                    <h3 className='text-xl font-semibold mb-4 flex items-center'>
                                        <User className='mr-2 h-5 w-5' />{' '}
                                        Intuition
                                    </h3>
                                    <div className='prose max-w-none'>
                                        {submission.intuition ||
                                            'No intuition provided'}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className='pt-6'>
                                    <h3 className='text-xl font-semibold mb-4 flex items-center'>
                                        <Code className='mr-2 h-5 w-5' />{' '}
                                        Approach
                                    </h3>
                                    <div className='prose max-w-none'>
                                        {submission.approach ||
                                            'No approach provided'}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value='code' className='space-y-6'>
                            {submission.codeSnippets &&
                            submission.codeSnippets.length > 0 ? (
                                submission.codeSnippets.map(
                                    (snippet, index) => (
                                        <Card key={index}>
                                            <CardContent className='pt-6'>
                                                <h3 className='text-xl font-semibold mb-4 flex items-center'>
                                                    <FileCode className='mr-2 h-5 w-5' />
                                                    {snippet.name ||
                                                        `Code Snippet ${index + 1}`}
                                                    <Badge className='ml-2'>
                                                        {snippet.language}
                                                    </Badge>
                                                </h3>
                                                <pre className='p-4 bg-muted rounded-md overflow-x-auto'>
                                                    <code>{snippet.code}</code>
                                                </pre>
                                            </CardContent>
                                        </Card>
                                    )
                                )
                            ) : (
                                <Card>
                                    <CardContent className='py-12 text-center'>
                                        <p className='text-muted-foreground'>
                                            No code snippets available
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value='additional' className='space-y-6'>
                            {/* Useful Links */}
                            <Card>
                                <CardContent className='pt-6'>
                                    <h3 className='text-xl font-semibold mb-4 flex items-center'>
                                        <Link2 className='mr-2 h-5 w-5' />{' '}
                                        Useful Links
                                    </h3>

                                    {submission.usefulLinks &&
                                    submission.usefulLinks.length > 0 ? (
                                        <ul className='space-y-2'>
                                            {submission.usefulLinks.map(
                                                (link, index) => (
                                                    <li
                                                        key={index}
                                                        className='flex items-start'
                                                    >
                                                        <ExternalLink className='h-4 w-4 mr-2 mt-1 flex-shrink-0' />
                                                        <div>
                                                            <a
                                                                href={link.url}
                                                                target='_blank'
                                                                rel='noopener noreferrer'
                                                                className='text-primary hover:underline font-medium'
                                                            >
                                                                {link.title ||
                                                                    link.url}
                                                            </a>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        <p className='text-muted-foreground'>
                                            No useful links provided
                                        </p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Custom Sections */}
                            {submission.customSections &&
                                submission.customSections.length > 0 &&
                                submission.customSections.map(
                                    (section, index) => (
                                        <Card key={index}>
                                            <CardContent className='pt-6'>
                                                <h3 className='text-xl font-semibold mb-4'>
                                                    {section.title}
                                                </h3>
                                                <div className='prose max-w-none'>
                                                    {section.content}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
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
