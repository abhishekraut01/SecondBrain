import { ReactNode } from "react"

interface IContentTypeBtnProps {
    icon:ReactNode;
    text:string
}

export const ContentTypeBtn = ({icon , text}:IContentTypeBtnProps) =>{
    return(
        <div className="flex rounded-md gap-2 items-center h-10  w-2/3 hover:bg-slate-300 transition-all duration-300">
            <div className="Social-logo text-2xl pl-4">
            {icon}
            </div>
            <h1 className="text-lg">{text}</h1>
        </div>
    )
}

