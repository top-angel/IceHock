import React from "react";

import { Meta } from "../layouts/Meta";
import { Main } from "../templates/Main";

import Datahub from "src/components/Datahub/Datahub";

const DatahubPage = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <Datahub />
    </Main>
  );
};

export default DatahubPage;
