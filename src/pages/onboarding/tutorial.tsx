import { Meta } from "../../layouts/Meta";
import { Main } from "../../templates/Main";

import Tutorial from "../../components/Onboarding/Tutorial";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const TutorialPage = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <Tutorial />
      <div className="fixed text-base font-bold text-gray-500 bottom-10 left-10 font-primary">
        @SportsAnalyticsPro
      </div>
    </Main>
  );
};

export default TutorialPage;
