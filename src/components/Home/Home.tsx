import React, { useEffect } from "react";
import Image from "next/image";
import Uploads from "./Uploads";

import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userActions } from "../../redux/user/userSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();

  const { isDataLoading, fileList } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    fileList: s.user.fileList,
  }));

  useEffect(() => {
    dispatch(
      userActions.getCSVFilesByUser({
        page_no: 1,
        per_page: 10,
        token: accessToken,
      })
    );
  }, []);

  const deleteFunc = (id: string) => {
    dispatch(userActions.deleteFile({ id: id, token: accessToken }));
  };

  return (
    <div className="px-6 pt-32 pb-5 h-fullScreen bg-purple">
      <div className="flex items-center justify-between mb-8">
        <div className="text-2xl font-medium text-white font-primary">
          My Uploads
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <input className="py-2 pl-2 pr-10 text-xs font-light border w-28 rounded-xl border-border bg-purple font-primary text-border focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary" />
            <Image
              src={"/assets/images/searchicon.svg"}
              alt="close"
              width={24}
              height={24}
              unoptimized
              className="absolute left-20 top-2"
            />
          </div>
          <div className="text-sm text-white font-primary">23</div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mb-5">
        {isDataLoading && loadingSpinner}
      </div>
      {!isDataLoading && JSON.stringify(fileList) !== "{}" && (
        <Uploads data={fileList} deleteFunc={deleteFunc} />
      )}
    </div>
  );
};

export default Home;

const loadingSpinner = (
  <svg
    className="w-8 h-8 mr-3 -ml-1 text-white animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="100"
      cy="100"
      r="350"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
