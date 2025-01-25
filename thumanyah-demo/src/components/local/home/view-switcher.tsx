'use client'

import { Menubar, MenubarContent, MenubarTrigger, MenubarItem, MenubarMenu } from "@/components/ui/menubar"
import { EllipsisVertical } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ViewSwitcher({view = "scroll", query} : {
    view: "scroll" | "grid",
    query: string | null
}) {

    const router = useRouter()

    return <>
        <Menubar>
            <MenubarMenu>
            <MenubarTrigger className=" data-[state=open]:data-[state=open]:bg-[#0e0f1a] px-1 border-0">
                <EllipsisVertical color="white" size={20} />
            </MenubarTrigger>
        <MenubarContent className="bg-gradient-to-tr from-[#404080] to-[#6B4080] space-y-1 text-white border-[0.8px] border-[#BA6FDE]/20 p-0 py-1 mr-4 ">
        {(view === "grid") && 
        <MenubarItem onClick={() => {
            router.push(
                '/home?' + new URLSearchParams({
                    view: "scroll",
                    query: query ? query : ""
                }).toString()
            )
        }}>Switch layout to Scroll</MenubarItem>
        }
        {
        (view === "scroll") &&
        <MenubarItem onClick={() => {
            router.push(
                '/home?' + new URLSearchParams({
                    view: "grid",
                    query: query ? query : ""
                }).toString())
        }}>Switch layout to Grid</MenubarItem>
        }
        </MenubarContent>
            </MenubarMenu>
        </Menubar>
    </>
}