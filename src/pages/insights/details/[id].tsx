import { Main } from "../../../templates/Main";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Meta } from "src/layouts/Meta";
import InsightsSubDetails from "src/components/Insights/InsightsSubDetails";

const InsightsSubDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <InsightsSubDetails />
    </Main>
  );
};

export default InsightsSubDetailsPage;
