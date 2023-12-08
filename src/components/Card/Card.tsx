import React from "react";
import { useRouter } from "next/router";

type props = {
  id: number;
  title: string;
  content: string;
  name: string;
  date: string;
  className?: string;
};

const Card = ({ id, title, content, name, date, className }: props) => {
  const router = useRouter();
  const polygonHandler = () => {};
  const moreHandler = () => {
    router.push(`/insights/${id}`);
  };

  return (
    <div
      className={`w-full rounded-xl border border-border opacity-60 hover:opacity-100 ${className}`}
    >
      <div className="px-4 pt-4 font-primary text-sm font-medium text-primary">
        {title}
      </div>
      <div className="my-4 px-4 font-primary text-xs font-light text-border">
        {content}
      </div>
      <div className="mb-4 flex items-center justify-between px-4">
        <div className="font-primary text-sm font-medium text-border">
          {name}
        </div>
        <div
          className="w-fit cursor-pointer rounded-xl border border-[#804BF2] bg-gradient-to-r from-[#2f298e] to-[#4d2e91] px-3 py-1 font-primary text-xs font-medium text-border"
          onClick={polygonHandler}
        >
          Polygon
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-border px-4 py-4">
        <div className="font-primary text-xs font-medium text-border">
          {date}
        </div>
        <div
          className="cursor-pointer font-primary text-sm font-bold text-primary"
          onClick={moreHandler}
        >
          See More -&gt;
        </div>
      </div>
    </div>
  );
};

export default Card;
