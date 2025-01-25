import SideNavbar from "@/components/local/navbars/side-navbar";
import { TopNavbar } from "@/components/local/navbars/top-navbar";
import { ReactNode } from "react";

export default function HomeLayout({children}: {
    children: ReactNode
}){

    return <>
     <div className="bg-[var:--background]">
    <TopNavbar/>
    <SideNavbar/>
    <section className="w-full sm:w-[calc(100%-14rem)] sm:ml-[14rem] flex flex-col gap-5 mt-[90] py-[20]">
        {children}
    </section>
    </div>
    </>
}