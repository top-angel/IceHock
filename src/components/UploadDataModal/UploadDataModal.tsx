import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";

import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userActions } from "../../redux/user/userSlice";

import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import ImageUploader from "./ImageUploader";

const plans = [
  {
    index: 0,
    name: "Training Files",
    description: "Select your previous missions as a template",
    icon: "/assets/images/trainingfiles.svg",
  },
  {
    index: 1,
    name: "Game File",
    description: "Fill in all input fields without any prefills",
    icon: "/assets/images/gamefiles.svg",
  },
];

export default function UploadDataModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(plans[0]);
  const [csvFile, setCSVFile] = useState(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();

  const { isDataLoading, uploadTraningFile } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    uploadTraningFile: s.user.uploadTraningFile,
  }));

  useEffect(() => {
    if (uploadTraningFile?._id) {
      closeModal();
      setCSVFile(null);
    }
  }, [uploadTraningFile]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    dispatch(userActions.setEmptyTraningFile({}));
  }

  const createHandle = () => {
    if (csvFile) {
      dispatch(
        userActions.uploadTraningFile({ file: csvFile, token: accessToken })
      );
    }
  };

  const onImageUpload = (file: any) => {
    setCSVFile(file);
    dispatch(userActions.setEmptyTraningFile({}));
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-[#634CF3] to-[#5E3BC3]"
          onClick={openModal}
        >
          <AiFillPlusSquare className="w-5 h-5" />
          Upload a file
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-25 backdrop-blur-lg" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform border border-gray-500 rounded-2xl bg-darkpurple">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between text-lg font-medium leading-6 text-white"
                  >
                    Upload Data
                    <AiOutlineClose
                      className="w-5 h-5 cursor-pointer hover:opacity-80"
                      onClick={closeModal}
                    />
                  </Dialog.Title>
                  <div className="mt-5">
                    <RadioGroup value={selected} onChange={setSelected}>
                      <div className="grid grid-cols-2 gap-3 ">
                        {plans.map((plan, index) => (
                          <RadioGroup.Option
                            key={plan.name}
                            value={plan}
                            className={({ active, checked }) =>
                              `${
                                active
                                  ? "opacity-100 p-[2px]"
                                  : "opacity-60 p-[1px]"
                              }
                              flex cursor-pointer bg-gradient-to-r from-pink-500 rounded-md via-[#4441EC] to-[#804BF2] h-14   focus:outline-none `
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex items-center justify-between w-full pl-3 rounded-md bg-darkpurple">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className="flex items-center gap-3 text-base font-semibold text-white font-primary"
                                      >
                                        <div className="p-2">
                                          {" "}
                                          <img src={plan.icon} />
                                        </div>{" "}
                                        {plan.name}
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid grid-cols-2 gap-3 p-5 -mx-6 border-t border-gray-500 mt-7">
                    <div className=" bg-gradient-to-r from-pink-500 rounded-md via-[#4441EC] to-[#804BF2] p-[1px] bg-opacity-20 ">
                      <div className="w-full p-4 rounded-md pb-22 bg-darkpurple">
                        <div className="mb-4 text-xl text-white font-primary">
                          Manual Upload
                        </div>
                        <ImageUploader
                          className="h-[126px]"
                          onImageUpload={onImageUpload}
                        />
                      </div>
                    </div>
                    <div className=" bg-gradient-to-r from-pink-500 rounded-md via-[#4441EC] to-[#804BF2] p-[1px] bg-opacity-20 ">
                      <div className="w-full h-full p-4 rounded-md bg-darkpurple">
                        <div className="mb-4 text-xl text-white font-primary">
                          Connect your sensor
                        </div>
                        <div className="cursor-pointer text-lg text-primary bg-gradient-to-r from-[#4441EC] to-[#804BF2]  inline-block text-transparent bg-clip-text">
                          Coming Soon
                        </div>
                        <div className="mt-4 text-sm text-gray-500 font-primary">
                          Sensor ID
                        </div>
                        <input className="w-full px-2 py-1 mt-2 text-white bg-transparent border border-gray-600 rounded-md " />
                      </div>
                    </div>
                  </div>
                  {!isDataLoading && (
                    <button
                      type="button"
                      onClick={createHandle}
                      className="flex items-center gap-2 px-4 py-2 text-base font-medium w-full justify-center text-white rounded-md bg-gradient-to-r from-[#634CF3] to-[#5E3BC3] disabled:opacity-80"
                      disabled={csvFile === null}
                    >
                      Upload
                    </button>
                  )}
                  {isDataLoading && (
                    <button
                      type="button"
                      onClick={createHandle}
                      className="flex items-center gap-2 px-4 py-2 text-base font-medium w-full justify-center text-white rounded-md bg-gradient-to-r from-[#634CF3] to-[#5E3BC3] disabled:opacity-80"
                      disabled={true}
                    >
                      {loadingSpinner} uploading...
                    </button>
                  )}
                  {uploadTraningFile?._id && (
                    <div className="mt-1 text-center text-green-300">
                      Uploaded successfully!
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const loadingSpinner = (
  <svg
    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
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
