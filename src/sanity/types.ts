/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
    _type: 'sanity.imagePaletteSwatch'
    background?: string
    foreground?: string
    population?: number
    title?: string
}

export type SanityImagePalette = {
    _type: 'sanity.imagePalette'
    darkMuted?: SanityImagePaletteSwatch
    lightVibrant?: SanityImagePaletteSwatch
    darkVibrant?: SanityImagePaletteSwatch
    vibrant?: SanityImagePaletteSwatch
    dominant?: SanityImagePaletteSwatch
    lightMuted?: SanityImagePaletteSwatch
    muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
    _type: 'sanity.imageDimensions'
    height?: number
    width?: number
    aspectRatio?: number
}

export type SanityImageHotspot = {
    _type: 'sanity.imageHotspot'
    x?: number
    y?: number
    height?: number
    width?: number
}

export type SanityImageCrop = {
    _type: 'sanity.imageCrop'
    top?: number
    bottom?: number
    left?: number
    right?: number
}

export type SanityFileAsset = {
    _id: string
    _type: 'sanity.fileAsset'
    _createdAt: string
    _updatedAt: string
    _rev: string
    originalFilename?: string
    label?: string
    title?: string
    description?: string
    altText?: string
    sha1hash?: string
    extension?: string
    mimeType?: string
    size?: number
    assetId?: string
    uploadId?: string
    path?: string
    url?: string
    source?: SanityAssetSourceData
}

export type SanityImageAsset = {
    _id: string
    _type: 'sanity.imageAsset'
    _createdAt: string
    _updatedAt: string
    _rev: string
    originalFilename?: string
    label?: string
    title?: string
    description?: string
    altText?: string
    sha1hash?: string
    extension?: string
    mimeType?: string
    size?: number
    assetId?: string
    uploadId?: string
    path?: string
    url?: string
    metadata?: SanityImageMetadata
    source?: SanityAssetSourceData
}

export type SanityImageMetadata = {
    _type: 'sanity.imageMetadata'
    location?: Geopoint
    dimensions?: SanityImageDimensions
    palette?: SanityImagePalette
    lqip?: string
    blurHash?: string
    hasAlpha?: boolean
    isOpaque?: boolean
}

export type Geopoint = {
    _type: 'geopoint'
    lat?: number
    lng?: number
    alt?: number
}

export type Slug = {
    _type: 'slug'
    current?: string
    source?: string
}

export type SanityAssetSourceData = {
    _type: 'sanity.assetSourceData'
    name?: string
    id?: string
    url?: string
}

export type CustomSection = {
    _type: 'customSection'
    title?: string
    content?: string
}

export type CodeSnippet = {
    _type: 'codeSnippet'
    name?: string
    language?: 'javascript' | 'python' | 'java' | 'cpp' | 'typescript' | 'other'
    code?: string
}

export type Submission = {
    _id: string
    _type: 'submission'
    _createdAt: string
    _updatedAt: string
    _rev: string
    submissionLink?: string
    problemLink?: string
    author?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'author'
    }
    submittedAt?: string
    intuition?: string
    approach?: string
    timeComplexity?: string
    spaceComplexity?: string
    usefulLinks?: Array<{
        title?: string
        url?: string
        _key: string
    }>
    codeSnippets?: Array<
        {
            _key: string
        } & CodeSnippet
    >
    customSections?: Array<
        {
            _key: string
        } & CustomSection
    >
    tags?: Array<string>
    difficulty?: 'easy' | 'medium' | 'hard'
    status?: 'solved' | 'partial' | 'needsImprovement'
}

export type Author = {
    _id: string
    _type: 'author'
    _createdAt: string
    _updatedAt: string
    _rev: string
    id?: number
    name?: string
    username?: string
    email?: string
    image?: string
    bio?: string
}

export type AllSanitySchemaTypes =
    | SanityImagePaletteSwatch
    | SanityImagePalette
    | SanityImageDimensions
    | SanityImageHotspot
    | SanityImageCrop
    | SanityFileAsset
    | SanityImageAsset
    | SanityImageMetadata
    | Geopoint
    | Slug
    | SanityAssetSourceData
    | CustomSection
    | CodeSnippet
    | Submission
    | Author
export declare const internalGroqTypeReferenceTo: unique symbol
// Source: ./src/sanity/lib/queries.ts
// Variable: AUTHOR_BY_GITHUB_ID_QUERY
// Query: *[_type == "author" && id == $id][0]{        _id,        id,        name,        username,        email,        image,        bio    }
export type AUTHOR_BY_GITHUB_ID_QUERYResult = {
    _id: string
    id: number | null
    name: string | null
    username: string | null
    email: string | null
    image: string | null
    bio: string | null
} | null
// Variable: AUTHOR_BY_ID_QUERY
// Query: *[_type == "author" && username == $username][0]{        _id,        id,        name,        username,        email,        image,        bio,        "submissions": *[_type == "submission" && author._ref == ^._id && (!defined($search) ||               problem match $search ||               intuition match $search ||               approach match $search            )] | order(_createdAt desc) {              _id,              submissionLink,              problem,              problemLink,              submittedAt,              timeComplexity,              spaceComplexity,              tags,              difficulty,              status            }    }
export type AUTHOR_BY_ID_QUERYResult = {
    _id: string
    id: number | null
    name: string | null
    username: string | null
    email: string | null
    image: string | null
    bio: string | null
    submissions: Array<{
        _id: string
        submissionLink: string | null
        problem: null
        problemLink: string | null
        submittedAt: string | null
        timeComplexity: string | null
        spaceComplexity: string | null
        tags: Array<string> | null
        difficulty: 'easy' | 'hard' | 'medium' | null
        status: 'needsImprovement' | 'partial' | 'solved' | null
    }>
} | null
// Variable: SUBMISSIONS_QUERY
// Query: *[_type == "submission" && !defined($search) ||           problem match $search ||           intuition match $search ||           approach match $search ||           author->name match $search        ] | order(_createdAt desc) {          _id,          submissionLink,          problem,          problemLink,          submittedAt,          author->{            _id,            name,            username,            image          },          intuition,          approach,          timeComplexity,          spaceComplexity,          tags,          difficulty,          status        }
export type SUBMISSIONS_QUERYResult = Array<
    | {
          _id: string
          submissionLink: null
          problem: null
          problemLink: null
          submittedAt: null
          author: null
          intuition: null
          approach: null
          timeComplexity: null
          spaceComplexity: null
          tags: null
          difficulty: null
          status: null
      }
    | {
          _id: string
          submissionLink: string | null
          problem: null
          problemLink: string | null
          submittedAt: string | null
          author: {
              _id: string
              name: string | null
              username: string | null
              image: string | null
          } | null
          intuition: string | null
          approach: string | null
          timeComplexity: string | null
          spaceComplexity: string | null
          tags: Array<string> | null
          difficulty: 'easy' | 'hard' | 'medium' | null
          status: 'needsImprovement' | 'partial' | 'solved' | null
      }
>
// Variable: SUBMISSION_BY_ID_QUERY
// Query: *[_type == "submission" && _id == $id][0]{          _id,          submissionLink,          problem,          problemLink,          submittedAt,          author->{            _id,            name,            username,            image,            bio          },          intuition,          approach,          timeComplexity,          spaceComplexity,          usefulLinks,          codeSnippets,          customSections,          tags,          difficulty,          status        }
export type SUBMISSION_BY_ID_QUERYResult = {
    _id: string
    submissionLink: string | null
    problem: null
    problemLink: string | null
    submittedAt: string | null
    author: {
        _id: string
        name: string | null
        username: string | null
        image: string | null
        bio: string | null
    } | null
    intuition: string | null
    approach: string | null
    timeComplexity: string | null
    spaceComplexity: string | null
    usefulLinks: Array<{
        title?: string
        url?: string
        _key: string
    }> | null
    codeSnippets: Array<
        {
            _key: string
        } & CodeSnippet
    > | null
    customSections: Array<
        {
            _key: string
        } & CustomSection
    > | null
    tags: Array<string> | null
    difficulty: 'easy' | 'hard' | 'medium' | null
    status: 'needsImprovement' | 'partial' | 'solved' | null
} | null
// Variable: SUBMISSIONS_GROUPED_BY_AUTHOR_QUERY
// Query: {          "authors": *[_type == "author"] {            _id,            name,            username,            image,            "submissions": *[_type == "submission" && author._ref == ^._id && (!defined($search) ||               problem match $search ||               intuition match $search ||               approach match $search            )] | order(_createdAt desc) {              _id,              submissionLink,              problem,              problemLink,              submittedAt,              timeComplexity,              spaceComplexity,              tags,              difficulty,              status            }          }        }
export type SUBMISSIONS_GROUPED_BY_AUTHOR_QUERYResult = {
    authors: Array<{
        _id: string
        name: string | null
        username: string | null
        image: string | null
        submissions: Array<{
            _id: string
            submissionLink: string | null
            problem: null
            problemLink: string | null
            submittedAt: string | null
            timeComplexity: string | null
            spaceComplexity: string | null
            tags: Array<string> | null
            difficulty: 'easy' | 'hard' | 'medium' | null
            status: 'needsImprovement' | 'partial' | 'solved' | null
        }>
    }>
}
// Variable: SUBMISSIONS_BY_AUTHOR_QUERY
// Query: *[_type == "submission" && author._ref == $id] | order(_createdAt desc) {          _id,          submissionLink,          problem,          problemLink,          submittedAt,          author->{            _id,            name,            username,            image          },          tags,          difficulty,          status        }
export type SUBMISSIONS_BY_AUTHOR_QUERYResult = Array<{
    _id: string
    submissionLink: string | null
    problem: null
    problemLink: string | null
    submittedAt: string | null
    author: {
        _id: string
        name: string | null
        username: string | null
        image: string | null
    } | null
    tags: Array<string> | null
    difficulty: 'easy' | 'hard' | 'medium' | null
    status: 'needsImprovement' | 'partial' | 'solved' | null
}>
// Variable: SUBMISSIONS_BY_PROBLEM_QUERY
// Query: *[_type == "submission" && problem match $problem] | order(_createdAt desc) {          _id,          submissionLink,          problem,          problemLink,          submittedAt,          author->{            _id,            name,            username,            image          },          tags,          difficulty,          status        }
export type SUBMISSIONS_BY_PROBLEM_QUERYResult = Array<{
    _id: string
    submissionLink: string | null
    problem: null
    problemLink: string | null
    submittedAt: string | null
    author: {
        _id: string
        name: string | null
        username: string | null
        image: string | null
    } | null
    tags: Array<string> | null
    difficulty: 'easy' | 'hard' | 'medium' | null
    status: 'needsImprovement' | 'partial' | 'solved' | null
}>
// Variable: SUBMISSIONS_BY_TAG_QUERY
// Query: *[_type == "submission" && $tag in tags] | order(_createdAt desc) {          _id,          submissionLink,          problem,          problemLink,          submittedAt,          author->{            _id,            name,            username,            image          },          tags,          difficulty,          status        }
export type SUBMISSIONS_BY_TAG_QUERYResult = Array<{
    _id: string
    submissionLink: string | null
    problem: null
    problemLink: string | null
    submittedAt: string | null
    author: {
        _id: string
        name: string | null
        username: string | null
        image: string | null
    } | null
    tags: Array<string> | null
    difficulty: 'easy' | 'hard' | 'medium' | null
    status: 'needsImprovement' | 'partial' | 'solved' | null
}>
// Variable: SUBMISSIONS_BY_DIFFICULTY_QUERY
// Query: *[_type == "submission" && difficulty == $difficulty] | order(_createdAt desc) {          _id,          submissionLink,          problem,          problemLink,          submittedAt,          author->{            _id,            name,            username,            image          },          tags,          difficulty,          status        }
export type SUBMISSIONS_BY_DIFFICULTY_QUERYResult = Array<{
    _id: string
    submissionLink: string | null
    problem: null
    problemLink: string | null
    submittedAt: string | null
    author: {
        _id: string
        name: string | null
        username: string | null
        image: string | null
    } | null
    tags: Array<string> | null
    difficulty: 'easy' | 'hard' | 'medium' | null
    status: 'needsImprovement' | 'partial' | 'solved' | null
}>
// Variable: RECENT_SUBMISSIONS_QUERY
// Query: *[_type == "submission"] | order(submittedAt desc)[0..4] {          _id,          submissionLink,          problem,          problemLink,          submittedAt,          author->{            _id,            name,            username,            image          },          tags,          difficulty,          status        }
export type RECENT_SUBMISSIONS_QUERYResult = Array<{
    _id: string
    submissionLink: string | null
    problem: null
    problemLink: string | null
    submittedAt: string | null
    author: {
        _id: string
        name: string | null
        username: string | null
        image: string | null
    } | null
    tags: Array<string> | null
    difficulty: 'easy' | 'hard' | 'medium' | null
    status: 'needsImprovement' | 'partial' | 'solved' | null
}>
// Variable: USER_SUBMISSION_STATS_QUERY
// Query: {          "total": count(*[_type == "submission" && author._ref == $id]),          "easy": count(*[_type == "submission" && author._ref == $id && difficulty == "easy"]),          "medium": count(*[_type == "submission" && author._ref == $id && difficulty == "medium"]),          "hard": count(*[_type == "submission" && author._ref == $id && difficulty == "hard"])        }
export type USER_SUBMISSION_STATS_QUERYResult = {
    total: number
    easy: number
    medium: number
    hard: number
}

// Query TypeMap
import '@sanity/client'
declare module '@sanity/client' {
    interface SanityQueries {
        '\n    *[_type == "author" && id == $id][0]{\n        _id,\n        id,\n        name,\n        username,\n        email,\n        image,\n        bio\n    }\n    ': AUTHOR_BY_GITHUB_ID_QUERYResult
        '\n    *[_type == "author" && username == $username][0]{\n        _id,\n        id,\n        name,\n        username,\n        email,\n        image,\n        bio,\n        "submissions": *[_type == "submission" && author._ref == ^._id && (!defined($search) || \n              problem match $search || \n              intuition match $search || \n              approach match $search\n            )] | order(_createdAt desc) {\n              _id,\n              submissionLink,\n              problem,\n              problemLink,\n              submittedAt,\n              timeComplexity,\n              spaceComplexity,\n              tags,\n              difficulty,\n              status\n            }\n    }\n    ': AUTHOR_BY_ID_QUERYResult
        '\n        *[_type == "submission" && !defined($search) || \n          problem match $search || \n          intuition match $search || \n          approach match $search || \n          author->name match $search\n        ] | order(_createdAt desc) {\n          _id,\n          submissionLink,\n          problem,\n          problemLink,\n          submittedAt,\n          author->{\n            _id,\n            name,\n            username,\n            image\n          },\n          intuition,\n          approach,\n          timeComplexity,\n          spaceComplexity,\n          tags,\n          difficulty,\n          status\n        }\n      ': SUBMISSIONS_QUERYResult
        '\n        *[_type == "submission" && _id == $id][0]{\n          _id,\n          submissionLink,\n          problem,\n          problemLink,\n          submittedAt,\n          author->{\n            _id,\n            name,\n            username,\n            image,\n            bio\n          },\n          intuition,\n          approach,\n          timeComplexity,\n          spaceComplexity,\n          usefulLinks,\n          codeSnippets,\n          customSections,\n          tags,\n          difficulty,\n          status\n        }\n      ': SUBMISSION_BY_ID_QUERYResult
        '\n        {\n          "authors": *[_type == "author"] {\n            _id,\n            name,\n            username,\n            image,\n            "submissions": *[_type == "submission" && author._ref == ^._id && (!defined($search) || \n              problem match $search || \n              intuition match $search || \n              approach match $search\n            )] | order(_createdAt desc) {\n              _id,\n              submissionLink,\n              problem,\n              problemLink,\n              submittedAt,\n              timeComplexity,\n              spaceComplexity,\n              tags,\n              difficulty,\n              status\n            }\n          }\n        }\n      ': SUBMISSIONS_GROUPED_BY_AUTHOR_QUERYResult
        '\n        *[_type == "submission" && author._ref == $id] | order(_createdAt desc) {\n          _id,\n          submissionLink,\n          problem,\n          problemLink,\n          submittedAt,\n          author->{\n            _id,\n            name,\n            username,\n            image\n          },\n          tags,\n          difficulty,\n          status\n        }\n      ': SUBMISSIONS_BY_AUTHOR_QUERYResult
        '\n        *[_type == "submission" && problem match $problem] | order(_createdAt desc) {\n          _id,\n          submissionLink,\n          problem,\n          problemLink,\n          submittedAt,\n          author->{\n            _id,\n            name,\n            username,\n            image\n          },\n          tags,\n          difficulty,\n          status\n        }\n      ': SUBMISSIONS_BY_PROBLEM_QUERYResult
        '\n        *[_type == "submission" && $tag in tags] | order(_createdAt desc) {\n          _id,\n          submissionLink,\n          problem,\n          problemLink,\n          submittedAt,\n          author->{\n            _id,\n            name,\n            username,\n            image\n          },\n          tags,\n          difficulty,\n          status\n        }\n      ': SUBMISSIONS_BY_TAG_QUERYResult
        '\n        *[_type == "submission" && difficulty == $difficulty] | order(_createdAt desc) {\n          _id,\n          submissionLink,\n          problem,\n          problemLink,\n          submittedAt,\n          author->{\n            _id,\n            name,\n            username,\n            image\n          },\n          tags,\n          difficulty,\n          status\n        }\n      ': SUBMISSIONS_BY_DIFFICULTY_QUERYResult
        '\n        *[_type == "submission"] | order(submittedAt desc)[0..4] {\n          _id,\n          submissionLink,\n          problem,\n          problemLink,\n          submittedAt,\n          author->{\n            _id,\n            name,\n            username,\n            image\n          },\n          tags,\n          difficulty,\n          status\n        }\n      ': RECENT_SUBMISSIONS_QUERYResult
        '\n        {\n          "total": count(*[_type == "submission" && author._ref == $id]),\n          "easy": count(*[_type == "submission" && author._ref == $id && difficulty == "easy"]),\n          "medium": count(*[_type == "submission" && author._ref == $id && difficulty == "medium"]),\n          "hard": count(*[_type == "submission" && author._ref == $id && difficulty == "hard"])\n        }\n      ': USER_SUBMISSION_STATS_QUERYResult
    }
}
