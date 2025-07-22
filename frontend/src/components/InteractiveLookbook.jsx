import React from "react";
import Title from "./Title"; // adjust the path as per your file structure
import summerVibes from "../assets/lookbook/summer-vibes.jpg";
import urbanStreet from "../assets/lookbook/urban-street.jpg";
import classicElegance from "../assets/lookbook/classic-elegance.jpg";
import workChic from "../assets/lookbook/work-chic.jpg";

const lookbookItems = [
  {
    title: "Summer Vibes",
    subtitle: "Light & Breezy",
    image: summerVibes,
  },
  {
    title: "Urban Street",
    subtitle: "Bold & Raw",
    image: urbanStreet,
  },
  {
    title: "Classic Elegance",
    subtitle: "Timeless Looks",
    image: classicElegance,
  },
  {
    title: "Work Chic",
    subtitle: "Smart & Stylish",
    image: workChic,
  },
];

const InteractiveLookbook = () => {
  return (
    <div className="py-20 px-4 md:px-12">
      <div className="text-center mb-12 text-3xl">
        <Title text1="INTERACTIVE" text2="LOOKBOOK" />
        <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mt-2 text-center">
          Explore the latest styles curated just for you. Click on a collection
          to discover more.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {lookbookItems.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-md group cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[400px] object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-white text-xl font-bold">{item.title}</h3>
              <p className="text-pink-400">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveLookbook;
