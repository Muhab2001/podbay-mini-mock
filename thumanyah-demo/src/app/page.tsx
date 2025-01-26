import { searchPodcasts } from "@/actions/podcasts"
import PodcastGridView from "@/components/local/podcasts/grid-view"
import PodcastScrollView from "@/components/local/podcasts/scroll-view"



export default async function Home({searchParams}: {
    searchParams?: {
        query: string | null,
        view: "grid" | "scroll"
    }
}) {

    const incomingParams = (await searchParams)

    let view = "scroll"
    if (incomingParams?.view && incomingParams?.view !== null) {
        view = incomingParams?.view
    }
    
    const podcasts = await searchPodcasts(incomingParams?.query || "") 

    return <>
    {view == "scroll" ? <PodcastScrollView searchParams={incomingParams} podcasts={podcasts}/>: <PodcastGridView searchParams={incomingParams}  podcasts={podcasts}/>}
    </>
}