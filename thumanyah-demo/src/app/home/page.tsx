import SideNavbar from "@/components/ui/navbars/side-navbar";
import { TopNavbar } from "@/components/ui/navbars/top-navbar";


export default function Home() {

    return <div className="bg-[var:--background]">
    <TopNavbar/>
       <SideNavbar/>
    </div>
}