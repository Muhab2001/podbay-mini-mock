import Image from "next/image";
import { Clock, LayoutGrid, Orbit, Rocket, Rows3 } from "lucide-react";
import { NavBarItem } from "./navbar-item";
import { ibmPlexBold } from "@/app/layout";
import Link from "next/link";

export default function SideNavbar() {

    const iconColor = "#86858F"

    return <>
    <div className=" hidden sm:flex flex-col w-56 h-screen border-[#2F2E38] border-[1px] absolute left-0 top-0 bg-[#0e0f1a] ">
    <Image
                  className="dark:invert mb-8 ml-3 mt-3 p-1"
                  src="/logo.svg"
                  alt="Website logo"
                  width={55}
                  height={19}
                  priority
                />
    <section className="flex flex-col w-full h-full">
    <NavBarItem icon={<Orbit color={iconColor} size={18}/>} text="Home" link="/home" />
    <NavBarItem icon={<Rocket color={iconColor} size={18}/>} text="Discover" link="/" />
    <div className={ibmPlexBold.className + " font-bold uppercase  text-gray-500 text-[14px] mt-4 mb-1 ml-4 text-dimmed"}>YOUR STUFF</div>
    <NavBarItem icon={<Rows3 color={iconColor} size={18}/>} text="My Queue" link="/" />
    <NavBarItem icon={<LayoutGrid color={iconColor} size={18}/>} text="My Podcasts" link="/" />
    <NavBarItem icon={<Clock color={iconColor} size={18}/>} text="Recents" link="/" />
    </section>
    <section className="flex flex-col w-full text-xs gap-y-1 text-gray-500 ml-3 mb-5">
        <div>Podbay v2.9.6 by Fancy Soups.</div>
        <div className="flex gap-x-2 flex-row items-center">
        <Link href='/'>About</Link>
        <Link href='/'>All Podcasts</Link>
        </div>
    </section>
    </div>
    </>
}