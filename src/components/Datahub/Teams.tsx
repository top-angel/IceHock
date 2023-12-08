import React, { Fragment, useState } from "react";
import Table from "../Table/Table";
import { useRouter } from "next/router";

import { useAppSelector } from "../../redux/hooks";
import { Menu, Transition } from "@headlessui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ReactPaginate from "react-paginate";

const Teams = () => {
  const router = useRouter();
  const { members } = useAppSelector((s) => ({
    members: s.user.members,
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<any>(members);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = members.filter(
      (member: any) => member?.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredMembers.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = ({ selected }: any) => {
    setCurrentPage(selected + 1);
  };

  const rows = [];
  for (let i = 0; i < currentPosts.length; i++) {
    const e: any = currentPosts[i];
    const picture = e.picture.thumbnail;
    const name = e.login.username;
    const files = e.dob.age;
    const match_files = e.registered.age;
    const gender = e.gender;
    const missionNames = e.email;
    const date = e.dob.date;

    rows.push([
      <div className="text-sm inline-block">
        <div className=" text-white  px-2 flex items-center gap-2 ">
          <img src={picture} className="w-7 h-7 rounded-full" />
          <div>
            <div className="text-base">{name}</div>
            <div className="text-sm text-gray-300">1st</div>
          </div>
        </div>
      </div>,
      <div
        key={missionNames}
        className="flex items-center font-primary text-sm font-medium text-white"
      >
        {files}
      </div>,
      <div className={`text-sm text-white  font-primary`}>{match_files}</div>,
      <div className="text-white text-sm">
        <div>24</div>
        <div className="text-gray-500">12.3MB</div>
      </div>,
      <div className="text-white text-sm">
        <div>13</div>
      </div>,
    ]);
  }

  let content;

  if (rows.length) {
    content = (
      <div className="border-t border-gray-500">
        <Table
          header={[
            "File name",
            "Training Files",
            "Match Files",
            "Data Amount(Rows)",
            "Players",
          ]}
          rows={rows}
        />
        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(filteredMembers.length / postsPerPage)}
          previousLabel={"Previous"}
          nextLabel={"Next"}
          previousClassName="w-1/2 ml-3"
          nextClassName="w-1/2 text-right mr-3"
          containerClassName={"flex items-center justify-center py-2.5 "}
          pageClassName={"w-12"}
          pageLinkClassName="font-primary text-white text-sm px-2 py-1 rounded-md hover:border-none hover:bg-bordergray hover:bg-opacity-10"
          previousLinkClassName={
            "border border-gray-600 text-sm px-3 py-1 rounded-md text-white hover:border-bordergray"
          }
          nextLinkClassName={
            "border border-gray-600 text-sm px-3 py-1 rounded-md text-white hover:border-bordergray"
          }
          activeLinkClassName={"text-gray-400"}
        />
      </div>
    );
  } else {
    content = (
      <div className="border-t border-bordergray p-5 font-primary text-sm font-medium text-white">
        No List.
      </div>
    );
  }

  return (
    <div className="border border-gray-500 rounded-xl mt-7">
      <div className="text-white font-primary text-lg p-5 flex items-center justify-between">
        <div>
          <div>Teams</div>
          <div className="text-sm text-gray-400">
            Your competition and their most important data
          </div>
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <BiDotsVerticalRounded className="h-8" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-darkpurple shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Duplicate
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div>{content}</div>;
    </div>
  );
};

export default Teams;
