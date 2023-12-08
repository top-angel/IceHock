import React from "react";

import Image from "next/image";
import Button from "../Button/Button";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useAuthContext } from "../../context/AuthProvider";

export interface Values {
  email: string;
  password: string;
}

type props = {
  onClick: () => void;
};

const LoginForm = ({ onClick }: props) => {
  const { user, authenticated } = usePrivy();
  const { accessToken, loading } = useAuthContext();

  return (
    <div className="w-1/2 p-10">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="logo"
          width="50"
          height="50"
        />
        <div className="mt-3 text-3xl font-medium text-white font-primary">
          Welcome back
        </div>
        <div className="mt-3 text-lg font-light text-white font-primary">
          Start your sports data journey here !
        </div>
      </div>
      {!loading && (
        <Button
          type="button"
          onClick={onClick}
          className="inline-flex items-center justify-center mt-10 text-white rounded-xl bg-gradient-to-r from-[#634CF3] to-[#5E3BC3] font-primary"
        >
          Login
        </Button>
      )}
      {loading && (
        <Button
          type="button"
          onClick={onClick}
          className="inline-flex items-center justify-center mt-10 bg-gradient-to-r from-[#634CF3] to-[#5E3BC3] text-white rounded-xl font-primary"
        >
          {loadingSpinner} Loading...
        </Button>
      )}
    </div>
  );
};

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

export default LoginForm;
