import { Separator } from "@radix-ui/react-menubar";
import { ReactNode } from "react";

export default function Header({title, subtitle, children}: {title: string, subtitle?: string | null, children?: ReactNode}) {

    return <>
    <header>
    <div className="flex flex-row w-full items-end">
        <div className="flex flex-col gap-0 flex-grow">
        <h5 className="text-muted font-bold  font-[family-name:var(--font-ibm-plex-bold)] px-[30]">{title}</h5>
    {subtitle && <p className="text-gray-400 text-xs font-[family-name:var(--font-ibm-plex)] px-[30]">{subtitle}</p>}
        </div>
        {children}
    </div>
    <Separator className="my-4 h-[0.5] bg-[#2F2E38] border-1 w-full" />
    </header>
    </>

}