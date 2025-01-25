"use server"

import { ReadPodcastResponse } from "@/lib/types/podcasts"

interface SearchPodcastResponse {
    message: string
    results: ReadPodcastResponse[]
    statusCode: number
}

export async function searchPodcasts(query: string) {

    const response = await fetch(process.env.BASE_URL as string + '?' + new URLSearchParams({
        term: query,
        limit: "25"
    }).toString(), {
        'cache': 'no-store'
    })

    const data: SearchPodcastResponse = await response.json()

    if (data.statusCode !== 200) {
        throw new Error(data.message)
    }

    return data.results
    
}