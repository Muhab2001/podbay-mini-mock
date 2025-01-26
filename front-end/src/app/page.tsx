'use client'
import { searchPodcasts } from "@/actions/podcasts"
import PodcastGridView from "@/components/local/podcasts/grid-view"
import PodcastScrollView from "@/components/local/podcasts/scroll-view"
import { ReadPodcastResponse } from "@/lib/types/podcasts"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from "swr"

export default function Home() {

    const [page, setPage] = useState<number>(1)
    const searchParams = useSearchParams()
    const query = searchParams.get('query')
    const view: "grid" | "scroll" = (searchParams.get('view') as "grid" | "scroll" )|| "grid"
    const [fetchedPodcasts, setPodcasts] = useState<ReadPodcastResponse[]>([])

    const {data, isLoading} = useSWR(['/podcasts/', page, searchParams.get('query')], async ([, page_, query_]: [string, number, string]) => {
        console.log("INSIDE FETCHER", query_, page_)
        return await searchPodcasts(query_, page_)
    }, {
        // revalidateOnMount: false,
        revalidateOnFocus: false,
        onSuccess: (data) => {
            setPodcasts([...fetchedPodcasts, ...data])
        }
    })

    let title = "Trending podcasts in all genres"
    let subtitle: string | null = "The most popular podcasts overall now. Last updated an hour ago."
    if (query) {
        title = `Top podcasts for ${query}`
        subtitle = null
    }
    
    useEffect(() => {
        setPodcasts([])
        setPage(1)
    }, [query])


    console.log(fetchedPodcasts.length);


    return <>
    {view == "scroll" ? <PodcastScrollView title={title} subtitle={subtitle} query={query || ""} view={view} podcasts={fetchedPodcasts}/>: <PodcastGridView isDone={(data?.length || 0) < 25} onLoadMore={() => {
        
        setPage(page + 1)
        console.log("changing page value", page);
    }} isLoading={isLoading} title={title} subtitle={subtitle} view={view} query={query || ""}   podcasts={fetchedPodcasts}/>}
    </>
}