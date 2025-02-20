import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa6";

interface CardProps {
  title: string;
  description?: string;
  tags?: string[];
  date: string;
  type: "idea" | "article" | "tip" | "youtube";
}

const typeIcons = {
  idea: <FaRegLightbulb className="text-gray-600 text-xl" />, 
  article: <MdOutlineArticle className="text-gray-600 text-xl" />, 
  tip: <FaRegLightbulb className="text-gray-600 text-xl" />, 
  youtube: <FaYoutube className="text-gray-600 text-xl"/>
};

const GenericCard: React.FC<CardProps> = ({ title, description, tags, date, type }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-80">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 text-gray-700">
        <div className="flex items-center gap-2 font-semibold">
          {typeIcons[type]}
          <span>{title}</span>
        </div>
        <div className="flex gap-2 text-gray-500 text-lg">
          <IoIosShareAlt className="cursor-pointer hover:text-gray-700" />
          <RiDeleteBin6Line className="cursor-pointer hover:text-red-500" />
        </div>
      </div>
      
      {/* description */}
      {description && <p className="text-gray-600 text-sm mb-3">{description}</p>}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags?.map((tag, index) => (
          <span key={index} className="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-1">
            #{tag}
          </span>
        ))}
      </div>

      {/* Date */}
      <p className="text-xs text-gray-500">Added on {date}</p>
    </div>
  );
};

export default GenericCard;
