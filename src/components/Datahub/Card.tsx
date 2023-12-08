import React from "react";

type props = {
  title: string;
  value: string;
  icon: any;
  unit?: string;
};

const Card = ({ title, value, icon, unit }: props) => {
  return (
    <div className="border bg-darkpurple border-gray-500 rounded-2xl p-4 flex items-start font-primary justify-between">
      <div className="text-white text-lg">
        <div>{title}</div>
        <div className="mt-4 flex items-end gap-2">
          <div className="text-3xl font-primary font-bold">{value}</div>
          <div className="mb-1">{unit}</div>
        </div>
      </div>
      <img src={`/assets/images/${icon}`} alt="avatar" width={32} height={32} />
    </div>
  );
};

export default Card;
