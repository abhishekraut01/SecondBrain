import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaYoutube, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";

interface CardProps {
  title: string;
  description?: string;
  tags?: string[];
  date: string;
  type: "idea" | "twitter" | "instagram" | "youtube" | "facebook";
  link?: string;
}

const typeIcons = {
  idea: <FaRegLightbulb className="text-gray-600 text-xl" />,
  article: <MdOutlineArticle className="text-gray-600 text-xl" />,
  youtube: <FaYoutube className="text-gray-600 text-xl" />,
  twitter: <FaTwitter className="text-gray-600 text-xl" />,
  instagram: <FaInstagram className="text-gray-600 text-xl" />,
  facebook: <FaFacebook className="text-gray-600 text-xl" />,
};

// Function to detect link type and render appropriate embed
const getEmbedComponent = (link: string | undefined, type: string) => {
  if (!link) return null;

  if (type === "youtube" && link.includes("youtube.com")) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${link.replace(
          "https://www.youtube.com/watch?v=",
          ""
        )}`}
        title="YouTube video player"
        className="w-full aspect-video rounded-md overflow-hidden"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    );
  }

  if (type === "twitter") {
    return (
      <blockquote className="twitter-tweet">
        <a href={link.replace("x.com", "twitter.com")}></a>
      </blockquote>
    );
  }

  if (type === "instagram" && link.includes("instagram.com")) {
    return (
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={link}
        data-instgrm-version="14"
      ></blockquote>
    );
  }

  if (type === "facebook" && link.includes("facebook.com")) {
    return (
      <iframe
        src={link}
        className="w-full aspect-video rounded-md overflow-hidden"
        allowFullScreen
      ></iframe>
    );
  }

  return <p className="text-red-500">Embedding not supported for this link.</p>;
};

const GenericCard: React.FC<CardProps> = ({
  title,
  description,
  tags,
  date,
  type,
  link,
}) => {
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

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-sm mb-3">{description}</p>
      )}

      {/* Embedded Content */}
      {getEmbedComponent(link, type)}

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2 mb-3">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-1"
          >
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
