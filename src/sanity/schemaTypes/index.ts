import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import {
    codeSnippetSchema,
    customSectionSchema,
    submission,
} from './submission'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [author, submission, codeSnippetSchema, customSectionSchema],
}
