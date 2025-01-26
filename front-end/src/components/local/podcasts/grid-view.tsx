import { ReadPodcastResponse } from "@/lib/types/podcasts"
import Header from "../utils/header"
import { PodcastSquareCard } from "./square-card"
import ViewSwitcher from "../home/view-switcher"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

 
export default function PodcastGridView({
    podcasts,
    title, subtitle, view, query, isLoading, onLoadMore, isDone
}: {
    podcasts: ReadPodcastResponse[],
    title: string,
    subtitle: string | null,
    view: "grid" | "scroll",
    query: string,
    isLoading: boolean,
    isDone: boolean
    onLoadMore: () => void
}) {



    return <>
    <Header title={title} subtitle={subtitle}>
        <div className="pr-2">
        <ViewSwitcher view={view} query={query || ""} />
        </div>
    </Header>
    <div className="p-4 flex flex-row gap-2 flex-wrap">
        {podcasts.map((podcast, index) => {
                return <PodcastSquareCard key={index} podcast={podcast} index={index+1}/>
            })
            }
        {
            (isLoading && podcasts.length ===0) && Array.from({length: 6}).map((_, index) => {
                return <Skeleton key={index} style={{width: "calc(25% - 0.5rem)"}} className="h-24"/>
            })
        }
    </div>
    { !isDone &&  <div className="flex justify-center">
        <Button size={"sm"} className="hover:underline hover:bg-transparent hover:text-white border-gray-700" onClick={onLoadMore} variant={"outline"}>{
            isLoading ? "Loading..." : "Load more"
            }</Button>

    </div>}
    </>
}