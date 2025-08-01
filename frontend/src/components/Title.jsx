import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-3xl text-pink-400">
        {text1} <span className="text-pink-600 font-medium">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-pink-600"></p>
    </div>
  );
};

export default Title;
