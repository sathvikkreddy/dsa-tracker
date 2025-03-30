import { defineField, defineType } from 'sanity'
import { FileTextIcon } from 'lucide-react'

// Schema for code snippets
export const codeSnippetSchema = defineField({
    name: 'codeSnippet',
    title: 'Code Snippet',
    type: 'object',
    fields: [
        defineField({
            name: 'name',
            title: 'Snippet Name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            options: {
                list: [
                    { title: 'JavaScript', value: 'javascript' },
                    { title: 'Python', value: 'python' },
                    { title: 'Java', value: 'java' },
                    { title: 'C++', value: 'cpp' },
                    { title: 'TypeScript', value: 'typescript' },
                    { title: 'Other', value: 'other' },
                ],
            },
            initialValue: 'javascript',
        }),
        defineField({
            name: 'code',
            title: 'Code',
            type: 'text',
            validation: Rule => Rule.required(),
        }),
    ],
})

// Schema for custom sections
export const customSectionSchema = defineField({
    name: 'customSection',
    title: 'Custom Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
            validation: Rule => Rule.required(),
        }),
    ],
})

// Main submission schema
export const submission = defineType({
    name: 'submission',
    title: 'Submission',
    type: 'document',
    icon: FileTextIcon,
    fields: [
        defineField({
            name: 'submissionLink',
            title: 'Submission Link',
            type: 'url',
            validation: Rule =>
                Rule.required().custom(url => {
                    // Validate submission link format
                    if (!url) return true
                    const regex =
                        /^https:\/\/(www\.)?leetcode\.com\/problems\/[a-z0-9-]+\/submissions\/\d+\/?$/
                    if (!regex.test(url)) {
                        return 'Please enter a valid LeetCode submission URL'
                    }
                    return true
                }),
        }),
        defineField({
            name: 'problem',
            title: 'Problem',
            type: 'string',
            readOnly: true,
            description: 'Automatically extracted from the submission link',
        }),
        defineField({
            name: 'problemLink',
            title: 'Problem Link',
            type: 'url',
            readOnly: true,
            description: 'Automatically extracted from the submission link',
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'intuition',
            title: 'Intuition',
            type: 'text',
            description:
                'Describe your initial thoughts and understanding of the problem',
        }),
        defineField({
            name: 'approach',
            title: 'Approach',
            type: 'text',
            description: 'Explain your approach to solving the problem',
        }),
        defineField({
            name: 'timeComplexity',
            title: 'Time Complexity',
            type: 'string',
        }),
        defineField({
            name: 'spaceComplexity',
            title: 'Space Complexity',
            type: 'string',
        }),
        defineField({
            name: 'usefulLinks',
            title: 'Useful Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: Rule => Rule.required(),
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'codeSnippets',
            title: 'Code Snippets',
            type: 'array',
            of: [{ type: 'codeSnippet' }],
        }),
        defineField({
            name: 'customSections',
            title: 'Custom Sections',
            type: 'array',
            of: [{ type: 'customSection' }],
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'difficulty',
            title: 'Difficulty',
            type: 'string',
            options: {
                list: [
                    { title: 'Easy', value: 'easy' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Hard', value: 'hard' },
                ],
            },
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Solved', value: 'solved' },
                    { title: 'Partially Solved', value: 'partial' },
                    { title: 'Needs Improvement', value: 'needsImprovement' },
                ],
            },
            initialValue: 'solved',
        }),
    ],
    preview: {
        select: {
            title: 'problem',
            subtitle: 'author.name',
            media: 'FileTextIcon',
        },
    },
})

// You'll need to register both schemas in your schema.js or index.js file:
// export const schemaTypes = [author, submission, ...]
