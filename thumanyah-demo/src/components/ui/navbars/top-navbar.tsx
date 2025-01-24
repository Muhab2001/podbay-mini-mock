import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../button"

export function TopNavbar(){

    const chevronsColor = "#C4C5C9"

    return <>
    <div className="flex flex-row fixed top-0 left-[14rem] h-30 right-0 w-full pt-3 pl-4">
        <Button size={"xl"} variant={"rounded"} className="group max-w-56 max-h-30">
        <ChevronLeft className="p-0 group-hover:outline-white" color={chevronsColor} size={25}/>
            </Button> 
            <Button size={"xl"} variant={"rounded"} className="group max-w-56 max-h-30">
        <ChevronRight className="p-0 group-hover:outline-white" color={chevronsColor} size={25}/>
            </Button> 
        </div>
    </>
}