import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-[#fff0f5] shadow-lg overflow-hidden min-h-[460px] custom-rounded-hero mt-2">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center px-6 py-12 sm:py-20">
        <div className="text-[#3a3a3a] max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-[#ff69b4]"></span>
            <span className="text-[#ff69b4] font-semibold text-sm tracking-wide">
              NEW COLLECTIONS
            </span>
          </div>

          <h1 className="prata-regular text-4xl sm:text-5xl text-[#2d2d2d] leading-snug mb-4">
            Latest{" "}
            <span className="prata-regular text-[#d63384]">Arrivals</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl font-medium mb-8">
            Forever <span className="text-[#ff69b4]">Trendy</span>. Forever{" "}
            <span className="text-[#ff69b4]">You🩷</span>
          </p>

          <div className="flex items-center gap-3 group cursor-pointer w-fit transition-all duration-300">
            <span className="text-[#d63384] font-semibold text-base group-hover:underline">
              SHOP NOW
            </span>
            <span className="w-10 h-[1.5px] bg-[#d63384] transition-all duration-300 group-hover:w-12"></span>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2">
        <img
          className="w-full h-full object-cover"
          src={assets.hero_img}
          alt="Fashion Hero"
        />
      </div>
    </div>
  );
};

export default Hero;
