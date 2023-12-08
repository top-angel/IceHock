import React, { useState, useEffect } from "react";

import { Meta } from "../layouts/Meta";
import { Main } from "../templates/Main";

import Home from "../components/Home/Home";

import { useAppDispatch } from "../redux/hooks";
import { userActions } from "../redux/user/userSlice";

const Index = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      userActions.allMembers({ url: "https://randomuser.me/api/?results=10" })
    );
  }, []);

  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <Home />
    </Main>
  );
};

export default Index;
