import { ReadPodcastResponse } from "@/lib/types/podcasts"
import Header from "../utils/header"
import { PodcastSquareCard } from "./square-card"
import ViewSwitcher from "../home/view-switcher"

 
export default function PodcastGridView({
    podcasts,
    searchParams
}: {
    podcasts: ReadPodcastResponse[],
    searchParams?: {
        query?: string | undefined | null
        view: "grid" | "scroll"
    }
}) {

    let subtitle = "The most popular podcasts overall now. Last updated an hour ago."
    if (searchParams?.query) {
        subtitle = `Top podcasts for ${searchParams.query}`
    }


    return <>
    <Header title="Trending podcasts in all genres" subtitle={subtitle}>
        <div className="pr-2">
        <ViewSwitcher view={searchParams?.view || "scroll"} query={searchParams?.query || ""} />
        </div>
    </Header>
    <div className="p-4 flex flex-row gap-2 flex-wrap">
        {podcasts.map((podcast, index) => {
                return <PodcastSquareCard key={index} podcast={podcast} index={index+1}/>
            })
            }
    </div>
    </>
}