import { Menubar, MenubarItem, MenubarSeparator, MenubarContent, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { EllipsisVertical } from "lucide-react"


export default function NavbarDropdown() {

    return <>
    <Menubar className="">
        <MenubarMenu>
        <MenubarTrigger className=" data-[state=open]:data-[state=open]:bg-[#0e0f1a] px-1 border-0">
            <EllipsisVertical color="white" />
        </MenubarTrigger>
        <MenubarContent className="bg-gradient-to-tr from-[#404080] to-[#6B4080] space-y-1 text-white border-[0.8px] border-[#BA6FDE]/20 p-0 py-1 mr-4 ">
        <MenubarItem className="md:hidden">Log in</MenubarItem>
        <MenubarItem className="md:hidden">Sign up</MenubarItem>
        <MenubarItem>Settings</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Recents</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>About Podbay</MenubarItem>
        <MenubarItem>{"What's New"}</MenubarItem>
        <MenubarItem>Podcaster FAQ</MenubarItem>
        <MenubarItem>Privacy</MenubarItem>
        <MenubarItem>Terms</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Contact & Feedback</MenubarItem>
        <MenubarItem>Clear Data...</MenubarItem> 
        </MenubarContent>
        </MenubarMenu>
    </Menubar>
    </>
}