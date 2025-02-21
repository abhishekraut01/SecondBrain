import { ContentTypeBtn } from "./ContentTypeBtn";
import { FaYoutube, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";


export const SideBar = () => {
  return (
    <div className="w-56 h-full bg-slate-200">
        <div className="text-xl font-semibold text-gray-800 pl-8 mt-5">
            <h1>Second Brain</h1>
        </div>
        <div className="h-96 mt-12 cursor-pointer flex flex-col gap-5 items-center pt-5">
        <ContentTypeBtn icon ={<FaTwitter/>} text="Twitter"/>
        <ContentTypeBtn icon ={<FaYoutube/>} text="Youtube"/>
        <ContentTypeBtn icon ={<FaInstagram/>} text="Instagram"/>
        <ContentTypeBtn icon ={<FaFacebook/>} text="Facebook"/>
        </div>
    </div>
  )
};
