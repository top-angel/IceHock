import { useEffect, type ReactNode } from "react";
import { userActions } from "../redux/user/userSlice";
import Header from "../components/_Layout/Header/Header";
import { useRouter } from "next/router";
import { usePrivy } from "@privy-io/react-auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useAuthContext } from "../context/AuthProvider";
import { redirect } from "next/navigation";

import { deleteCookie } from "../utils/cookies";

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((s) => ({
    isLoggedIn: s.user.isLoggedIn,
  }));
  const { logout, ready, authenticated } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/login");
    }
  }, [ready, authenticated]);

  const logoutClick = () => {
    deleteCookie("jwtAccess");
    deleteCookie("jwtRefresh");
    deleteCookie("accountId");
    logout();
    dispatch(userActions.logout());
  };

  if (!ready || !authenticated) {
    return <></>;
  }

  return (
    <div className="w-full">
      {props.meta}

      <div className="w-full">
        {!router.pathname.includes("onboarding") && (
          <Header logout={logoutClick} />
        )}
        <main className="text-xl content">{props.children}</main>
      </div>
    </div>
  );
};

export { Main };
