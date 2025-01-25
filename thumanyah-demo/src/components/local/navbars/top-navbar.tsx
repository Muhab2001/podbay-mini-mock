'use client'

import { Input } from "@/components/ui/input"
import { DoubleChevronButton } from "../utils/double-chevron-button"
import { useDebounce } from "@/hooks/debounce"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import NavbarDropdown from "./navbar-settings-dropdown"


export function TopNavbar(){

    const router = useRouter()
    const searchParams = useSearchParams()

    const [query, setValue] = useState("")
    useDebounce(query, 500, (value: string) => {
        router.push('/home?' + new URLSearchParams({
            query: value,
            view: searchParams.get("view") || "scroll"

        }).toString())
    })

    const chevronsColor = "#C4C5C9"

    return <>
    <div className="flex flex-row gap-3 sm:gap-2 items-center top-0 sm:ml-[14rem] h-[46] right-0 w-full sm:w-[calc(100%-14rem)] pl-4 mt-3 sm:mt-1 sm:pt-3 pr-4">
        {/* TODO: add the icon optionally when the screen is too small */}
        <Image
                          className="dark:invert p-1 sm:hidden"
                          src="/logo.svg"
                          alt="Website logo"
                          width={45}
                          height={45}
                          priority
                        />
        <DoubleChevronButton
        color={chevronsColor}
        leftOnClick={router.back}
        rightOnClick={router.forward}
        size={10}
        buttonClassName="p-0 group-hover:stroke-white h-full"
        containerClassName="hidden sm:flex"
        />
        {/* can be improved by creating a component handling different tailwind breakpoints */}
        <Input onChange={(event) => {
            setValue(event.target.value)
        }} className={`
        border-gray-600 border-[1px] rounded-lg placeholder:text-sm h-full hidden sm:flex
        flex-grow
         focus:border-[#7B7BF0] placeholder:text-center text-center 
         focus:placeholder:opacity-0`}
         placeholder="Search through over 70 million podcasts and episodes..." />
         <Input onChange={(event) => {
            setValue(event.target.value)
        }} className={`
        border-gray-600 border-[1px] rounded-lg placeholder:text-sm h-[65%] flex sm:hidden
        flex-grow
         focus:border-[#7B7BF0] placeholder:text-center text-center 
         focus:placeholder:opacity-0`}
         placeholder="Search" /> 
        <Button size={"sm"} className="text-white bg-[#3B6388] text-[13] h-full hidden md:block">Log in</Button>
        <Button size={"sm"} className="text-white bg-[#3B6388] text-[13] h-full hidden md:block">Sign up</Button>
        <NavbarDropdown />
    </div>
    </>
}