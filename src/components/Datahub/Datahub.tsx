import React, { useEffect } from "react";

import Card from "./Card";
import Teams from "./Teams";

import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userActions } from "../../redux/user/userSlice";

const Datahub = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();

  const { isDataLoading, statisticsData } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    statisticsData: s.user.statisticsData,
  }));

  useEffect(() => {
    dispatch(userActions.getStatisticsData({ token: accessToken }));
  }, []);

  if (!statisticsData) {
    return <div></div>;
  }

  return (
    <div className="px-6 pt-32 pb-5 h-fullScreen bg-purple">
      <div className="mb-8 text-2xl font-medium text-white font-primary">
        Datahub
      </div>
      <div className="grid grid-cols-4 gap-3">
        <Card
          title="Amount of Teams"
          icon={"note.svg"}
          value={statisticsData?.amount_of_team}
        />
        <Card
          title="Your Data Amount"
          icon={"dropdown.svg"}
          value={statisticsData?.user_data_amount}
          unit="Games"
        />
        <Card
          title="1st Place Data Amount"
          icon={"cup.svg"}
          value={statisticsData?.first_data_amount}
          unit="Games"
        />
        <Card
          title="Total Data Amount"
          icon={"fatrows.svg"}
          value={statisticsData?.total_data_amount}
          unit="Games"
        />
      </div>
      <Teams />
    </div>
  );
};

export default Datahub;
