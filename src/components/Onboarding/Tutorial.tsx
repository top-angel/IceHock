import React, { useState, useRef } from "react";
import Button from "../Button/Button";

import { useRouter } from "next/router";
import Slider from "react-slick";

const Tutorial = () => {
  const slider = useRef<any>(null);
  const router = useRouter();

  const onClickNext = () => {
    slider.current.slickNext();
  };

  const settings = {
    dots: true,
    dotsClass: "slick-dots",
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current: any, next: any) => {
      if (current === next) {
        router.push("/");
      }
    },
  };

  return (
    <div className="h-fullScreen bg-[url('/assets/images/pattern.svg')] bg-no-repeat bg-top bg-darkpurple flex items-center justify-center">
      <div className="relative w-1/2 p-5 border border-gray-500 rounded-xl">
        <div className="flex gap-3">
          <img
            src={"/assets/images/tutorial.svg"}
            alt="avatar"
            width={64}
            height={64}
          />
          <div>
            <div className="text-white font-primary">
              Welcome to SportsAnalyticsPro
            </div>
            <div className="text-sm text-gray-500 font-primary">
              Go through the tutorial to get a deeper understanding of the
              platform.
            </div>
          </div>
          <div></div>
        </div>
        <div className="relative mt-4">
          <Slider {...settings} ref={slider}>
            <div className="text-base text-white font-primary">
              Attention he extremity unwilling on otherwise. Conviction up
              partiality as delightful is discovered. Yet jennings resolved
              disposed exertion you off. Left did fond drew fat head poor. So if
              he into shot half many long. China fully him every fat was world
              grave.
            </div>
            <div className="text-base text-white font-primary">
              Ye to misery wisdom plenty polite to as. Prepared interest
              proposal it he exercise. My wishing an in attempt ferrars. Visited
              eat you why service looking engaged. At place no walls hopes rooms
              fully in. Roof hope shy tore leaf joy paid boy. Noisier out
              brought entered detract because sitting sir. Fat put occasion
              rendered off humanity has.
            </div>
            <div className="text-base text-white font-primary">
              Ignorant saw her her drawings marriage laughter. Case oh an that
              or away sigh do here upon. Acuteness you exquisite ourselves now
              end forfeited. Enquire ye without it garrets up himself. Interest
              our nor received followed was. Cultivated an up solicitude mr
              unpleasant.
            </div>
            <div className="text-base text-white font-primary">
              In friendship diminution instrument so. Son sure paid door with
              say them. Two among sir sorry men court. Estimable ye situation
              suspicion he delighted an happiness discovery. Fact are size cold
              why had part. If believing or sweetness otherwise in we forfeited.
              Tolerably an unwilling arranging of determine. Beyond rather
              sooner so if up wishes or.
            </div>
            <div className="text-base text-white font-primary">
              Up am intention on dependent questions oh elsewhere september. No
              betrayed pleasure possible jointure we in throwing. And can event
              rapid any shall woman green. Hope they dear who its bred. Smiling
              nothing affixed he carried it clothes calling he no. Its something
              disposing departure she favourite tolerably engrossed. Truth short
              folly court why she their balls. Excellence put unaffected
              reasonable mrs introduced conviction she. Nay particular
              delightful but unpleasant for uncommonly who.
            </div>
          </Slider>
          <Button
            className="inline-flex items-center justify-center  mt-3 text-white rounded-lg bg-gradient-to-r from-[#634CF3] to-[#5E3BC3] font-primary text-base"
            onClick={onClickNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
