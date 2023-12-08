import React, { useState } from "react";
import ImageUploader from "../Common/ImageUploader";

import { useRouter } from "next/router";
import { useAuthContext } from "src/context/AuthProvider";

import { BiImage } from "react-icons/bi";
import Button from "../Button/Button";
import { useAppDispatch } from "../../redux/hooks";
import { userActions } from "../../redux/user/userSlice";
import { useAppSelector } from "src/redux/hooks";

const CreateProfile = () => {
  const router = useRouter();
  const [image, setImage] = useState<any>();
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();

  const { address, isDataLoading } = useAppSelector((s) => ({
    address: s.user.user.wallet.address,
    isDataLoading: s.user.isDataLoading,
  }));
  const onClickNext = () => {
    console.log(image);
    dispatch(userActions.username({ public_address: address, username: name }));
    dispatch(
      userActions.uploadProfilePicture({
        file: image.file,
        address: address,
        token: accessToken,
      })
    );
  };

  return (
    <div className="h-fullScreen bg-[url('/assets/images/pattern.svg')] bg-no-repeat bg-top bg-darkpurple flex items-center justify-center">
      <div className="w-1/3 p-5 border border-gray-500 rounded-xl">
        <div className="flex gap-3">
          <img
            src={"/assets/images/users.svg"}
            alt="avatar"
            width={64}
            height={64}
          />
          <div>
            <div className="text-white font-primary">
              Create your Team Profile
            </div>
            <div className="text-sm text-gray-500 font-primary">
              Create your company profile for free in less than 5 minutes.
            </div>
          </div>
        </div>
        <div className="flex gap-8 py-4">
          <div className="text-white whitespace-nowrap">Profile image</div>
          <div className="flex items-center justify-center w-full gap-6">
            <div className="inline-block border border-white rounded-full">
              {image ? (
                <img
                  src={image?.url}
                  alt="avatar"
                  className="rounded-full w-14"
                />
              ) : (
                <div className="flex items-center justify-center border border-white rounded-full w-14 h-14 bg-purple">
                  <BiImage className="text-white" />
                </div>
              )}
            </div>
            <div className="w-full">
              <ImageUploader
                className="bg-purple"
                onImageUpload={(props: any) => setImage(props)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-8 py-4">
          <div className="text-white whitespace-nowrap">Team Name*</div>
          <div className="flex items-center justify-center w-full gap-6">
            <input
              type="text"
              className="w-full px-3 py-2 ml-4 text-sm text-white bg-transparent border border-white rounded-lg"
              placeholder="e.g.Linear"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </div>
        <Button
          className="inline-flex items-center justify-center  mt-3 text-white rounded-lg bg-gradient-to-r from-[#634CF3] to-[#5E3BC3] font-primary text-base opacity-100 disabled:opacity-50"
          onClick={onClickNext}
          disabled={name === "" || isDataLoading}
        >
          {isDataLoading ? loadingSpinner : `Next`}
        </Button>
      </div>
    </div>
  );
};

export default CreateProfile;

const loadingSpinner = (
  <svg
    className="w-6 h-6 mr-3 -ml-1 text-white animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
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
