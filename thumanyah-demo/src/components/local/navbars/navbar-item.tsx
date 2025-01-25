import Link from "next/link";
import { ReactNode } from "react";


export function NavBarItem({icon, children, link}: {
    icon: ReactNode,
    children: ReactNode,
    link: string
}) {

    return <>
    <Link href={link} passHref legacyBehavior >
    <div className="group flex flex-row item-center font-[color:var(--foreground)] w-full h-10 cursor-pointer font-[family-name:var(--font-ibm-plex)]">
        <div className=" ml-4 group-hover:text-teal-500 mr-4 flex items-center">{icon}</div>
        <div className="flex text-sm  items-center">
            {children}
        </div>
        <div className=" opacity-0 group-hover:opacity-10 bg-gradient-to-r from-gray-200/75 to-gray-200/15 to-opacity-5 absolute h-10 w-[60px]"></div>
    </div>
    </Link>
    </>
}