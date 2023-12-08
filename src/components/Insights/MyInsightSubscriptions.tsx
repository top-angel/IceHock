import React, { useState } from "react";
import { useRouter } from "next/router";
import Table from "../Table/Table";

import { useAppSelector } from "../../redux/hooks";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFolder } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import ReactPaginate from "react-paginate";

interface MyInsightSubscriptionsProps {
  filteredMembers: any;
}

const MyInsightSubscriptions = ({
  filteredMembers,
}: MyInsightSubscriptionsProps) => {
  const router = useRouter();
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
    const gender = e.gender;
    const missionNames = e.email;
    const date = e.dob.date;
    const idNumber = i;

    rows.push([
      <div className="inline-block text-sm">
        <div className=" flex  items-center gap-2 px-2 text-white ">
          <div>
            <div className="text-base">{e.location.city}</div>
            <div className="text-sm text-gray-300">
              {e.name.first} {e.name.last}
            </div>
          </div>
        </div>
      </div>,
      <div
        className={`inline-block rounded-xl bg-gradient-to-r from-[#634CF3]  to-[#5E3BC3] px-2 font-primary text-sm text-white `}
      >
        {gender === "male" ? "Out of date" : "Running"}
      </div>,
      <div
        key={idNumber}
        className="flex items-center font-primary text-sm font-medium text-white"
      >
        123
      </div>,

      <div className="text-red flex items-center text-sm text-white">
        {date}
      </div>,
      <div className="inline-block text-sm">
        <div className=" flex  items-center gap-2 px-2 text-white ">
          <div>
            <div className="text-base">24</div>
            <div className="text-sm text-gray-300">12.3Mb</div>
          </div>
        </div>
      </div>,
    ]);
  }

  let content;

  if (rows.length) {
    content = (
      <div className="rounded-xl border border-gray-500">
        <Table
          header={[
            "Insight Name",
            "Current Status",
            "Update Amount",
            "Last Update",
            "Insight Size",
          ]}
          rows={rows}
          onClick={(r) => onClickRow(r)}
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
      <div className="border-bordergray border-t p-5 font-primary text-sm font-medium text-white">
        No List.
      </div>
    );
  }

  const onClickRow = (props: any) => {
    router.push(`/insights/details/${props[2].key}`);
  };

  return <div className="h-full">{content}</div>;
};

export default MyInsightSubscriptions;
