import { defineQuery } from 'next-sanity'

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == "author" && id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
    `)

export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == "author" && username == $username][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio,
        "submissions": *[_type == "submission" && author._ref == ^._id && (!defined($search) || 
              problem match $search || 
              intuition match $search || 
              approach match $search
            )] | order(_createdAt desc) {
              _id,
              submissionLink,
              problem,
              problemLink,
              submittedAt,
              timeComplexity,
              spaceComplexity,
              tags,
              difficulty,
              status
            }
    }
    `)

export const SUBMISSIONS_QUERY = defineQuery(`
        *[_type == "submission" && !defined($search) || 
          problem match $search || 
          intuition match $search || 
          approach match $search || 
          author->name match $search
        ] | order(_createdAt desc) {
          _id,
          submissionLink,
          problem,
          problemLink,
          submittedAt,
          author->{
            _id,
            name,
            username,
            image
          },
          intuition,
          approach,
          timeComplexity,
          spaceComplexity,
          tags,
          difficulty,
          status
        }
      `)

// Get a submission by ID
export const SUBMISSION_BY_ID_QUERY = defineQuery(`
        *[_type == "submission" && _id == $id][0]{
          _id,
          submissionLink,
          problem,
          problemLink,
          submittedAt,
          author->{
            _id,
            name,
            username,
            image,
            bio
          },
          intuition,
          approach,
          timeComplexity,
          spaceComplexity,
          usefulLinks,
          codeSnippets,
          customSections,
          tags,
          difficulty,
          status
        }
      `)

export const SUBMISSIONS_GROUPED_BY_AUTHOR_QUERY = defineQuery(`
        {
          "authors": *[_type == "author"] {
            _id,
            name,
            username,
            image,
            "submissions": *[_type == "submission" && author._ref == ^._id && (!defined($search) || 
              problem match $search || 
              intuition match $search || 
              approach match $search
            )] | order(_createdAt desc) {
              _id,
              submissionLink,
              problem,
              problemLink,
              submittedAt,
              timeComplexity,
              spaceComplexity,
              tags,
              difficulty,
              status
            }
          }
        }
      `)

// Get submissions by author ID
export const SUBMISSIONS_BY_AUTHOR_QUERY = defineQuery(`
        *[_type == "submission" && author._ref == $id] | order(_createdAt desc) {
          _id,
          submissionLink,
          problem,
          problemLink,
          submittedAt,
          author->{
            _id,
            name,
            username,
            image
          },
          tags,
          difficulty,
          status
        }
      `)

// Get submissions by problem name/pattern
export const SUBMISSIONS_BY_PROBLEM_QUERY = defineQuery(`
        *[_type == "submission" && problem match $problem] | order(_createdAt desc) {
          _id,
          submissionLink,
          problem,
          problemLink,
          submittedAt,
          author->{
            _id,
            name,
            username,
            image
          },
          tags,
          difficulty,
          status
        }
      `)

// Get submissions by tag
export const SUBMISSIONS_BY_TAG_QUERY = defineQuery(`
        *[_type == "submission" && $tag in tags] | order(_createdAt desc) {
          _id,
          submissionLink,
          problem,
          problemLink,
          submittedAt,
          author->{
            _id,
            name,
            username,
            image
          },
          tags,
          difficulty,
          status
        }
      `)

// Get submissions by difficulty
export const SUBMISSIONS_BY_DIFFICULTY_QUERY = defineQuery(`
        *[_type == "submission" && difficulty == $difficulty] | order(_createdAt desc) {
          _id,
          submissionLink,
          problem,
          problemLink,
          submittedAt,
          author->{
            _id,
            name,
            username,
            image
          },
          tags,
          difficulty,
          status
        }
      `)

// Get recent submissions (for dashboard)
export const RECENT_SUBMISSIONS_QUERY = defineQuery(`
        *[_type == "submission"] | order(submittedAt desc)[0..4] {
          _id,
          submissionLink,
          problem,
          problemLink,
          submittedAt,
          author->{
            _id,
            name,
            username,
            image
          },
          tags,
          difficulty,
          status
        }
      `)

// Get user stats (for dashboard)
export const USER_SUBMISSION_STATS_QUERY = defineQuery(`
        {
          "total": count(*[_type == "submission" && author._ref == $id]),
          "easy": count(*[_type == "submission" && author._ref == $id && difficulty == "easy"]),
          "medium": count(*[_type == "submission" && author._ref == $id && difficulty == "medium"]),
          "hard": count(*[_type == "submission" && author._ref == $id && difficulty == "hard"])
        }
      `)
