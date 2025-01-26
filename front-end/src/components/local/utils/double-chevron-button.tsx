import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function DoubleChevronButton(props: {
    leftOnClick: () => void,
    rightOnClick: () => void,
    buttonClassName?: string
    containerClassName?: string
    color: string
    size: number
}){

    return <>
    <div className={"flex flex-row gap-2 ml-2 mr-2 " + props.containerClassName}>
    <Button onClick={props.leftOnClick} className="group" size={"xl"} variant={"rounded"}>
    <ChevronLeft className={props.buttonClassName} color={props.color} size={25}/>
    </Button> 
    <Button onClick={props.rightOnClick} className="group" size={"xl"} variant={"rounded"}>
    <ChevronRight className={props.buttonClassName} color={props.color} size={25}/>
    </Button> 
    </div></>


}