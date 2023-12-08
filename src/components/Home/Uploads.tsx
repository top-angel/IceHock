import React, { useState } from "react";
import { useRouter } from "next/router";
import Table from "../Table/Table";

import { useAppSelector } from "../../redux/hooks";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFolder } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import ReactPaginate from "react-paginate";

type props = {
  data: any;
  deleteFunc: (id: string) => void;
};

const Uploads = ({ data, deleteFunc }: props) => {
  const router = useRouter();
  const { members } = useAppSelector((s) => ({
    members: s.user.members,
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<any>(members);

  // const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);

  //   const filtered = members.filter(
  //     (member: any) => member?.email.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredMembers(filtered);
  // };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data && data?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = ({ selected }: any) => {
    setCurrentPage(selected + 1);
  };

  const onDeleteFunc = (id: string) => {
    deleteFunc(id);
  };

  const rows = [];

  console.log(currentPosts);

  for (let i = 0; i < currentPosts?.length; i++) {
    const e: any = currentPosts[i];
    const status = e.status;
    const missionNames = "";
    const date = e.created_at;

    rows.push([
      <div className="inline-block text-sm">
        <div className="flex items-center gap-2 px-2 text-white ">
          <BsFolder className="w-6 h-6" />
          <div>
            <div className="text-base">{e.filename}</div>
            <div className="text-sm text-gray-300">
              {parseInt(e.filesize)} KB
            </div>
          </div>
        </div>
      </div>,
      <div
        key={missionNames}
        className="flex items-center text-sm font-medium text-white font-primary"
      >
        {date}
      </div>,
      <div
        className={`${
          status === "Accepted"
            ? "border-gray-600 text-white"
            : "border-red-400 text-red-400"
        } text-sm  border rounded-xl inline-block px-2 font-primary`}
      >
        {status === "Accepted" ? "Accepted" : "Rejected"}
      </div>,
      <div
        className="flex items-center justify-end text-white text-red"
        onClick={() => onDeleteFunc(e._id)}
      >
        <RiDeleteBin6Line className="text-gray-500" />
      </div>,
    ]);
  }

  let content;

  if (rows.length && currentPosts) {
    content = (
      <div className="border border-gray-500 rounded-xl">
        <Table
          header={["File name", "Date Uploaded", "Status", ""]}
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
      <div className="py-3 text-base font-medium text-center text-white border-t border-bordergray font-primary">
        <div>There is no uploaded files</div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default Uploads;
