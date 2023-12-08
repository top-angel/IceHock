import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import { useAppDispatch } from "../redux/hooks";
import { userActions } from "../redux/user/userSlice";
import { usePrivy } from "@privy-io/react-auth";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { login, ready, authenticated, user } = usePrivy();

  if (!ready) {
    return <></>;
  }

  if (ready && authenticated) {
    dispatch(userActions.authenticate(user));
  }

  return (
    <div className="grid items-center justify-center h-screen grid-cols-2 bg-gray">
      <div className="flex items-center justify-center bg-darkpurple h-full bg-[url('/assets/images/pattern.svg')] bg-no-repeat bg-center bg-top">
        <LoginForm onClick={login} />
      </div>
      <div className="bg-[url('/assets/images/login-right.svg')] w-full h-full bg-no-repeat bg-cover"></div>
    </div>
  );
};

export default LoginPage;
