import Image from "next/image";
import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { useAppSelector } from "../../../redux/hooks";

import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";
import classNames from "classnames";

import UploadDataModal from "src/components/UploadDataModal/UploadDataModal";

type props = {
  logout: () => void;
};

const Header = ({ logout }: props) => {
  const router = useRouter();

  const { address, username, picture } = useAppSelector((s) => ({
    address: s.user?.user?.email?.address,
    username: s.user?.username,
    picture: s.user?.pricture,
  }));

  return (
    <div className="fixed z-10 flex items-center justify-between w-full mx-auto bg-darkpurple p-7">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="flex items-center justify-center gap-3 font-primary hover:border-0"
        >
          <div className="h-9 w-9">
            {picture === "" ? (
              <Image
                src={"/assets/images/coca-cola.svg"}
                alt="logo"
                width={36}
                height={36}
                unoptimized
              />
            ) : (
              <img
                src={picture} // adjust the mime type accordingly
                alt="Your Image"
                className="rounded-full"
              />
            )}
          </div>
          <div className="text-base font-medium text-white">
            {username === "" ? address : username}
          </div>
        </Link>
      </div>
      <div className="flex gap-6">
        <Link
          href="/"
          className={classNames(
            "font-primary text-white hover:bg-purple hover:bg-opacity-5 hover:border-0 px-2.5 py-1.5 rounded-lg text-sm font-medium",
            router.pathname === "/" && "bg-primary bg-opacity-10"
          )}
        >
          My Uploads
        </Link>
        <Link
          href="/datahub"
          className={classNames(
            "font-primary text-white hover:bg-primary hover:bg-opacity-5 hover:border-0 px-2.5 py-1.5 rounded-lg text-sm font-medium",
            router.pathname === "/missions" && "bg-primary bg-opacity-10"
          )}
        >
          Datahub
        </Link>
        <Link
          href="/insights"
          className={classNames(
            "font-primary text-white hover:bg-primary hover:bg-opacity-5 hover:border-0 px-2.5 py-1.5 rounded-lg text-sm font-medium",
            router.pathname === "/missions" && "bg-primary bg-opacity-10"
          )}
        >
          Insights
        </Link>
      </div>
      <div className="flex items-center gap-5 text-darkgray">
        <div className="flex items-center justify-center">
          <UploadDataModal />
        </div>
        <IoNotificationsOutline
          className="text-xl text-white cursor-pointer"
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default Header;
