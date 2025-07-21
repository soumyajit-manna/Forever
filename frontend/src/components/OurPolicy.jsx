import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {/* Easy Exchange Policy */}
      <div>
        <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center m-auto mb-5 shadow-sm">
          <img src={assets.exchange_icon} className="w-6" alt="Exchange Icon" />
        </div>
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>

      {/* 7 Days Return Policy */}
      <div>
        <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center m-auto mb-5 shadow-sm">
          <img src={assets.quality_icon} className="w-6" alt="Return Icon" />
        </div>
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>

      {/* Best Customer Support */}
      <div>
        <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center m-auto mb-5 shadow-sm">
          <img src={assets.support_img} className="w-6" alt="Support Icon" />
        </div>
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
