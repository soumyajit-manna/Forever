import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <h2 className="section-heading">
      {text1} <span>{text2}</span>
    </h2>
  );
};

export default Title;
