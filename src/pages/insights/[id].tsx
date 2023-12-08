import { Main } from "../../templates/Main";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Meta } from "src/layouts/Meta";
import InsightsDetails from "src/components/Insights/InsightsDetails";

const InsightsDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <InsightsDetails />
    </Main>
  );
};

export default InsightsDetailsPage;
