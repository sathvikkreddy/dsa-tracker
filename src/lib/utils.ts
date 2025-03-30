import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const extractProblemName = (url: string | null) => {
    // Regular expression to match the problem name after "problems/"
    const regex = /problems\/([a-zA-Z-]+)/

    // Execute the regular expression
    const match = url?.match(regex)

    // If a match is found, return the problem name; otherwise, return null
    return match ? match[1] : null
}
