'use client'
import { ReadPodcastResponse } from "@/lib/types/podcasts"
import Header from "../utils/header"
import { DoubleChevronButton } from "../utils/double-chevron-button"
import ViewSwitcher from "../home/view-switcher"
import { PodcastSquareCard } from "./square-card"
import { useRef } from "react"

export default function PodcastScrollView({
    podcasts, title, subtitle, view, query
}: {
    podcasts: ReadPodcastResponse[],
    title: string,
    subtitle: string | null,
    view: "grid" | "scroll",
    query: string
}) {


    const scrollContainerRef = useRef<HTMLDivElement>(null)

    return <>
    <Header title={title} subtitle={subtitle}>
            <div className="flex flex-row flex-gap-1 pr-2">
                <DoubleChevronButton
                    size={16}
                    leftOnClick={() => {
                        console.log("clicking left");
                        
                        scrollContainerRef.current?.scrollBy({ left: -800, behavior: 'smooth' })
                    }}
                    rightOnClick={() => {
                        console.log("clicking right");
                        scrollContainerRef.current?.scrollBy({ left: 800, behavior: 'smooth' })
                    }}
                    color="#86858F"
                    />
                    <ViewSwitcher view={view} query={query || ""} />
            </div>
    </Header>
    <div ref={scrollContainerRef} style={{
        scrollbarGutter: "stable"
    }} className={"flex flex-row gap-2 pl-4 w-full overflow-x-scroll snap-x snap-center overflow-y-hidden scrollbar-none"}>
    {podcasts.map((podcast, index) => {
        return <PodcastSquareCard key={index} podcast={podcast} index={index+1}/>
    })
    }
    </div>
    </>
}