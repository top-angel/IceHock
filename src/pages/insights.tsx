import React from "react";

import { Meta } from "../layouts/Meta";
import { Main } from "../templates/Main";
import Insights from "src/components/Insights/Insights";

const InsightsPage = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <div className=" bg-purple pt-24 h-full">
        <Insights />
      </div>
    </Main>
  );
};

export default InsightsPage;
