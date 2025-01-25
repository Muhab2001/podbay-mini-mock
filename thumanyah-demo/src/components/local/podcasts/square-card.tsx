import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger, MenubarItem, MenubarSeparator } from "@/components/ui/menubar";
import { ReadPodcastResponse } from "@/lib/types/podcasts";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

export function PodcastSquareCard({podcast, index}: {podcast: ReadPodcastResponse, index?: number}) {


    return <>
    <div className="flex flex-col  gap-2 items-center justify-start h-fit pb-6 w-[140] md:w-[200] select-none">
        <div className=" w-[140] h-[140] md:w-[200] md:h-[200]">
        <Image
        width={200}
        height={200}
        className="rounded-sm"
        src={podcast.artworkUrl60!}
        alt={`Artwork for a track named ${podcast.trackName}`}
        />
        </div>
    <section className="flex flex-row gap-2 items-start justify-start w-full p-1.5">
        <p className="text-gray-300 font-extrabold font-[family-name:var(--font-ibm-plex-bold)] text-sm">#{index}</p>
        <div className="flex flex-grow flex-col">
            <p className="truncate w-24 text-sm font-[family-name:var(--font-ibm-plex-bold)]">{podcast.trackName}</p>
            <p className="truncate w-[110]  text-xs text-gray-500 font-[family-name:var(--font-ibm-plex)]">{podcast.collectionName}</p>
        </div>
        <Menubar className="w-fit h-fit p-0">
            <MenubarMenu>
                <MenubarTrigger className="text-gray-500 hover:text-gray-100 px-0 data-[state=open]:text-gray-100 data-[state=open]:bg-[#0e0f1a] border-0 cursor-pointer">
                    <EllipsisVertical size={15} />
                </MenubarTrigger>
                <MenubarContent className="bg-gradient-to-tr from-[#404080] to-[#6B4080] space-y-1 text-white border-[0.8px] border-[#BA6FDE]/20 p-0 py-1 mr-4 ">
                <MenubarItem>Add to My Podcasts</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Go to podcast</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share podcast</MenubarItem>
                <MenubarItem>Hide podcast</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    </section>
    </div>
    </>
}