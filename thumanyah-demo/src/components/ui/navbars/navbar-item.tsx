import Link from "next/link";
import { ReactNode } from "react";


// TODO: add extra tailing element to be apssed optionally to the end of the item
export async function NavBarItem({icon, text, link}: {
    icon: ReactNode,
    text: string,
    link: string
}) {

    return <>
    <Link href={link} passHref legacyBehavior>
    <div className="group flex flex-row item-center font-[color:var(--foreground)] w-full h-10 cursor-pointer">
        <div className=" ml-4 group-hover:text-teal-500 mr-4 flex items-center">{icon}</div>
        <div className="flex text-sm  items-center">{text}</div>
        <div className=" opacity-0 group-hover:opacity-10 bg-gradient-to-r from-gray-200/75 to-gray-200/15 to-opacity-5 absolute h-10 w-[60px]"></div>
    </div>
    </Link>
    </>
}