import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 text-gray-800 bg-white">
      {/* ABOUT US TITLE */}
      <div className="text-center pt-12 sm:pt-14">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* ABOUT SECTION */}
      <div className="my-12 sm:my-14 flex flex-col md:flex-row gap-10 md:gap-12 items-center">
        <img
          className="w-full max-w-md sm:max-w-lg md:max-w-[480px] rounded-2xl shadow-xl"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-4 md:gap-6 w-full md:w-2/4 text-gray-600">
          <p className="text-base sm:text-lg leading-relaxed">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online...
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products...
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Our Mission
          </h3>
          <p className="text-base sm:text-lg leading-relaxed">
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence...
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-center mb-10">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
        {/* Box 1 */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition duration-300">
          <h4 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
            Quality Assurance
          </h4>
          <p className="text-gray-600 text-sm sm:text-base">
            We meticulously select and vet each product...
          </p>
        </div>

        {/* Box 2 */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition duration-300">
          <h4 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
            Convenience
          </h4>
          <p className="text-gray-600 text-sm sm:text-base">
            With our user-friendly interface and hassle-free ordering...
          </p>
        </div>

        {/* Box 3 */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition duration-300">
          <h4 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
            Exceptional Customer Service
          </h4>
          <p className="text-gray-600 text-sm sm:text-base">
            Our team of dedicated professionals is here to assist you...
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  );
};

export default About;
