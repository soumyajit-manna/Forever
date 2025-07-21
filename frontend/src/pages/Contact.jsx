import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div className="min-h-screen py-12 px-2">
      {/* Title */}
      <div className="text-center mb-12">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Contact Info Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 max-w-6xl mx-auto px-6 py-10 ">
        <img
          className="w-full md:max-w-[450px] rounded-xl shadow-md"
          src={assets.contact_img}
          alt="Contact"
        />

        <div className="flex flex-col gap-5 text-gray-700 w-full md:max-w-md">
          <div>
            <h3 className="text-2xl font-semibold mb-1">🏬 Our Store</h3>
            <p className="text-gray-600">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-1">📞 Contact</h3>
            <p className="text-gray-600">
              Tel: (+91) 9382869803 <br />
              Email:{" "}
              <a
                href="mailto:mannasoumyajit47@gmail.com"
                className="text-blue-600 underline"
              >
                mannasoumyajit47@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-1">
              💼 Careers at Forever
            </h3>
            <p className="text-gray-600 mb-3">
              Learn more about our teams and job openings.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-800 transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mt-20">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default Contact;
