import { Meta } from "../../layouts/Meta";
import { Main } from "../../templates/Main";

import CreateProfile from "../../components/Onboarding/CreateProfile";

const CreateProfilePage = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <CreateProfile />
      <div className="fixed text-base font-bold text-gray-500 bottom-10 left-10 font-primary">
        @SportsAnalyticsPro
      </div>
    </Main>
  );
};

export default CreateProfilePage;
