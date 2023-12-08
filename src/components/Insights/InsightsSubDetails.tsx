import React from "react";
import Image from "next/image";
import router from "next/router";
import { AiFillPlusSquare } from "react-icons/ai";
interface Props {
  pathdetails?: any;
}

const data = [
  {
    title: "John Doe",
    content: "Owner",
    image: "/assets/images/insights1.svg",
  },
  {
    title: "14.09.2023",
    content: "Date of Creation",
    image: "/assets/images/insights2.svg",
  },
];

const historical_data = [
  {
    date: "13.09.2023",
    status: "load",
  },
  {
    date: "13.09.2023",
    status: "load",
  },
  {
    date: "13.09.2023",
    status: "load",
  },
  {
    date: "13.09.2023",
    status: "load",
  },
  {
    date: "13.09.2023",
    status: "load",
  },
];

const InsightsSubDetails = ({ pathdetails }: Props) => {
  const onClickBack = () => {
    router.back();
  };
  const subscribeHandle = () => {};
  return (
    <div className=" bg-purple pb-4 pt-24">
      <div className="flex items-center justify-between pb-5 pl-4 pr-4 pt-5">
        <div
          className="flex cursor-pointer items-center font-primary text-2xl font-medium text-white"
          onClick={onClickBack}
        >
          <Image
            src={"/assets/images/backicon.svg"}
            alt="back"
            width={24}
            height={24}
            className="mr-1"
            unoptimized
          />
          Back
        </div>
        <div className="font-primary text-lg font-semibold text-white">
          League Leaderboard Analyzer
        </div>
      </div>
      <div className="flex justify-between border-t border-border p-4">
        <div className="mr-2 h-fit w-2/3 rounded-xl border border-darkpurple bg-darkpurple p-4">
          <div className="flex justify-between">
            <div className="font-primary text-base font-normal text-white">
              Description & Visuals
            </div>
            <div className="font-primary text-base font-normal text-white">
              15.09.2023
            </div>
          </div>
          <div className="mb-2 mt-2 font-primary text-xs font-light text-primary opacity-50">
            Track how your team's performance evolves throughout the season.
            League Leaderboard Analyzer allows you to visualize trends in areas
            such as scoring, defense, and goaltending. Use this data to make
            mid-season adjustments and stay ahead of the competition. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
            Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
            mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
            tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo,
            non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at
            maximus ante fermentum sit amet. Pellentesque commodo lacus at
            sodales sodales. Quisque sagittis orci ut diam condimentum, vel
            euismod erat placerat.
          </div>
          <Image
            src={"/assets/images/insightssubtemp.svg"}
            alt="tempgraph"
            width={800}
            height={273}
            className="mt-5"
            unoptimized
          />
        </div>
        <div className="ml-2 w-1/3">
          <div className="mb-4 rounded-xl border border-darkpurple bg-darkpurple p-4">
            <div className="mb-4 flex justify-between">
              <div>
                <div className="font-primary text-xs font-light text-white">
                  Last Update
                </div>
                <div className="font-primary text-base font-normal text-white">
                  15.09.2023
                </div>
              </div>
              <Image
                src={"/assets/images/outofdateicon.svg"}
                alt="insights"
                width={90}
                height={22}
                className="cursor-pointer"
                unoptimized
              />
            </div>
            <div className="flex w-full items-center justify-center">
              <button
                type="button"
                className=" flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#634CF3] to-[#5E3BC3] px-4 py-2 text-center text-sm font-medium text-white"
                onClick={subscribeHandle}
              >
                <Image
                  src={"/assets/images/updatebuttonicon.svg"}
                  alt="update"
                  width={24}
                  height={24}
                  unoptimized
                />
                Update to Current Dataset
              </button>
            </div>
          </div>

          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="mb-4 flex justify-between rounded-xl border border-darkpurple bg-darkpurple p-4"
              >
                <div>
                  <div className="font-primary text-base font-normal text-white">
                    {item.title}
                  </div>
                  <div className="font-primary text-xs font-light text-white">
                    {item.content}
                  </div>
                </div>
                <Image
                  src={item.image}
                  alt="insights"
                  width={24}
                  height={24}
                  className="mr-1"
                  unoptimized
                />
              </div>
            );
          })}
          <div className="rounded-xl border border-darkpurple bg-darkpurple p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-primary text-xs font-light text-white">
                Historical Data
              </div>
              <Image
                src={"/assets/images/historyicon.svg"}
                alt="history"
                width={24}
                height={24}
                className="mr-1"
                unoptimized
              />
            </div>
            {historical_data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="mb-4 flex justify-between rounded-xl border border-purple bg-purple p-2"
                >
                  <div className="font-primary text-xs font-light text-white">
                    {item.date}
                  </div>
                  <div className="flex items-center">
                    <div className="font-primary text-[9px] font-bold text-white">
                      {item.status}
                    </div>
                    <Image
                      src={"/assets/images/linkicon.svg"}
                      alt="linkicon"
                      width={12}
                      height={12}
                      className="ml-2"
                      unoptimized
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsSubDetails;
