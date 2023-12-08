import React, { useState, Fragment } from "react";
import Card from "../Card/Card";
import { RadioGroup, Transition, Listbox } from "@headlessui/react";
import Image from "next/image";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import MyInsightSubscriptions from "./MyInsightSubscriptions";
import { useAppSelector } from "../../redux/hooks";

interface DataItem {
  id: number;
  title: string;
  content: string;
  name: string;
  date: string;
}

const data: DataItem[] = [
  {
    id: 0,
    title: "League Leaderboard Analyzer",
    content:
      "Track how your team's performance evolves throughout the season. League Leaderboard Analyzer allows you to visualize trends in areas such as scoring, defense, and goaltending. Use this data to make mid-season adjustments and stay ahead of the competition.",
    name: "John Doe",
    date: "14.09.2023",
  },
  {
    id: 1,
    title: "This is abc.",
    content:
      "Track how your team's performance evolves throughout the season. League Leaderboard Analyzer allows you to visualize trends in areas such as scoring, defense, and goaltending. Use this data to make mid-season adjustments and stay ahead of the competition.",
    name: "John Doe",
    date: "14.09.2023",
  },
  {
    id: 2,
    title: "Those are cats.",
    content:
      "Track how your team's performance evolves throughout the season. League Leaderboard Analyzer allows you to visualize trends in areas such as scoring, defense, and goaltending. Use this data to make mid-season adjustments and stay ahead of the competition.",
    name: "John Doe",
    date: "14.09.2023",
  },
  {
    id: 3,
    title: "This is abcd.",
    content:
      "Track how your team's performance evolves throughout the season. League Leaderboard Analyzer allows you to visualize trends in areas such as scoring, defense, and goaltending. Use this data to make mid-season adjustments and stay ahead of the competition.",
    name: "John Doe",
    date: "14.09.2023",
  },
  {
    id: 4,
    title: "League Leaderboard Analyzer",
    content:
      "Track how your team's performance evolves throughout the season. League Leaderboard Analyzer allows you to visualize trends in areas such as scoring, defense, and goaltending. Use this data to make mid-season adjustments and stay ahead of the competition.",
    name: "John Doe",
    date: "14.09.2023",
  },
  {
    id: 5,
    title: "League Leaderboard Analyzer",
    content:
      "Track how your team's performance evolves throughout the season. League Leaderboard Analyzer allows you to visualize trends in areas such as scoring, defense, and goaltending. Use this data to make mid-season adjustments and stay ahead of the competition.",
    name: "John Doe",
    date: "14.09.2023",
  },
  {
    id: 6,
    title: "League Leaderboard Analyzer",
    content:
      "Track how your team's performance evolves throughout the season. League Leaderboard Analyzer allows you to visualize trends in areas such as scoring, defense, and goaltending. Use this data to make mid-season adjustments and stay ahead of the competition.",
    name: "John Doe",
    date: "14.09.2023",
  },
  {
    id: 7,
    title: "League Leaderboard Analyzer",
    content:
      "Track how your team's performance evolves throughout the season. League Leaderboard Analyzer allows you to visualize trends in areas such as scoring, defense, and goaltending. Use this data to make mid-season adjustments and stay ahead of the competition.",
    name: "John Doe",
    date: "14.09.2023",
  },
  {
    id: 8,
    title: "League Leaderboard Analyzer",
    content:
      "Track how your team's performance evolves throughout the season. League Leaderboard Analyzer allows you to visualize trends in areas such as scoring, defense, and goaltending. Use this data to make mid-season adjustments and stay ahead of the competition.",
    name: "John Doe",
    date: "14.09.2023",
  },
  {
    id: 9,
    title: "League Leaderboard Analyzer",
    content:
      "Track how your team's performance evolves throughout the season. League Leaderboard Analyzer allows you to visualize trends in areas such as scoring, defense, and goaltending. Use this data to make mid-season adjustments and stay ahead of the competition.",
    name: "John Doe",
    date: "14.09.2023",
  },
  {
    id: 10,
    title: "League Leaderboard Analyzer",
    content:
      "Track how your team's performance evolves throughout the season. League Leaderboard Analyzer allows you to visualize trends in areas such as scoring, defense, and goaltending. Use this data to make mid-season adjustments and stay ahead of the competition.",
    name: "John Doe",
    date: "14.09.2023",
  },
  {
    id: 11,
    title: "League Leaderboard Analyzer",
    content:
      "Track how your team's performance evolves throughout the season. League Leaderboard Analyzer allows you to visualize trends in areas such as scoring, defense, and goaltending. Use this data to make mid-season adjustments and stay ahead of the competition.",
    name: "John Doe",
    date: "14.09.2023",
  },
];

const insights = [
  {
    index: 0,
    name: "Browse Insights",
    icon: "/assets/images/vehicle.svg",
    count: 12,
  },
  {
    index: 1,
    name: "My Insight Subscriptions",
    icon: "/assets/images/profileicon.svg",
    count: 0,
  },
];

const Insights = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item: DataItem) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm)
    );
  });

  const material = [
    { name: "Creation Date: Most Recent" },
    { name: "this year" },
    { name: "last year" },
    { name: "new year" },
  ];

  const [selected, setSelected] = useState(insights[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(material[0]);
  const [customMaterial, setCustomMaterial] = useState("");

  const { members } = useAppSelector((s) => ({
    members: s.user.members,
  }));

  const [searchQuerySub, setSearchQuerySub] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<any>(members);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuerySub(query);

    const filtered = members.filter(
      (member: any) =>
        member?.email.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredMembers(filtered);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-4 mt-5">
        <RadioGroup value={selected} onChange={setSelected}>
          <div className="grid grid-cols-2 gap-4">
            {insights.map((insights, index) => (
              <RadioGroup.Option
                key={insights.name}
                value={insights}
                className={({ active, checked }) =>
                  `${active ? "p-[2px] opacity-100" : "p-[1px] opacity-60"}
                  flex h-14 cursor-pointer rounded-md bg-gradient-to-r from-blue-500 via-[#4441EC] to-[#804BF2]   focus:outline-none `
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between rounded-md bg-darkpurple pl-3">
                      <div className="flex items-center">
                        <div className="text-lg">
                          <RadioGroup.Label
                            as="p"
                            className="flex items-center gap-3 font-primary text-lg font-medium text-primary"
                          >
                            <div className="p-0">
                              <img src={insights.icon} />
                            </div>
                            {insights.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      <div className="mr-4 font-primary text-xs font-normal text-primary">
                        {insights.count}
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="mb-2 flex items-center justify-between border-b border-border px-4 pb-6 pt-4">
        <div className="relative w-full">
          {selected.index === 0 && (
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-28 rounded-xl border border-border bg-purple py-2 pl-2 pr-10  font-primary text-xs font-light text-border focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
            />
          )}
          {selected.index === 1 && (
            <input
              type="text"
              placeholder="Search..."
              value={searchQuerySub}
              onChange={handleSearchInputChange}
              className="w-28 rounded-xl border border-border bg-purple py-2 pl-2 pr-10  font-primary text-xs font-light text-border focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
            />
          )}
          <Image
            src={"/assets/images/searchicon.svg"}
            alt="close"
            width={24}
            height={24}
            unoptimized
            className="absolute left-20 top-2"
          />
        </div>
        <Listbox
          value={selectedMaterial}
          onChange={(newValue) => {
            if (newValue.name === "Creation Date: Most Recent") {
              setSelectedMaterial(newValue);
            } else {
              setSelectedMaterial(newValue);
              setCustomMaterial("");
            }
          }}
        >
          <div className="insight-dropdown relative mt-1 w-80">
            <Listbox.Button className="ring-gray relative w-full cursor-default rounded-lg bg-purple py-2 pl-3 pr-10 text-left ring-1 ">
              <span className="block truncate font-primary text-xs font-medium text-primary">
                {selectedMaterial.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                style={{
                  position: "relative",
                  zIndex: 1,
                }}
                className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-purple py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {material.map((material, materialIdx) => (
                  <Listbox.Option
                    key={materialIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-primary bg-opacity-10 text-border"
                          : "text-primary"
                      }`
                    }
                    value={material}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {material.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      {selected.index === 0 && (
        <div className="grid grid-cols-4 gap-4 p-4">
          {filteredData.map((item: DataItem, index: number) => (
            <div key={index}>
              <Card
                id={item.id}
                title={item.title}
                content={item.content}
                name={item.name}
                date={item.date}
              />
            </div>
          ))}
        </div>
      )}
      {selected.index === 1 && (
        <div className="h-full p-4">
          <MyInsightSubscriptions filteredMembers={filteredMembers} />
        </div>
      )}
    </div>
  );
};

export default Insights;
