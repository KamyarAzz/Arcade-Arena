import Lottie from "lottie-react";
import {Meteors} from "@/components/magicui/meteors";
import astro from "@/assets/lottes/astronot.json";

export default function LandingSection() {
  return (
    <div className="relative w-full px-4 overflow-hidden rounded-md bg-gradient-to-r from-theme-100 to-theme-200 md:px-10 py-14 md:py-20">
      <div className="!z-50 flex flex-col justify-center gap-2">
        <p>Welcome to Arcade Arena</p>
        <h2 className="!z-50 font-bold text-3xl md::text-4xl capitalize">
          <span className="text-theme-300">Browse</span> Our Latest
          <br /> Games Here
        </h2>
        <a
          href="#games"
          className="!z-50 cursor-pointer flex items-center bg-theme-300 hover:bg-pink-600 mt-4 px-4 py-1.5 rounded-full w-min text-white text-center whitespace-nowrap duration-300"
        >
          Browse Now
        </a>
      </div>
      <Lottie
        className="top-16 sm:top-0 -right-16 sm:right-0 !z-0 absolute h-72 sm:h-96"
        animationData={astro}
      />
      <Meteors className="z-0" number={25} />
    </div>
  );
}
