import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import Title from "./Title";

const testimonials = [
  {
    name: "Emma Watson",
    title: "Fashion Blogger",
    message:
      "Absolutely love the quality and the lookbook features! Shopping here is always a premium experience.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Liam Johnson",
    title: "Model & Influencer",
    message:
      "ForeverYou has revolutionized my wardrobe. The attention to detail and fast delivery blew me away.",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className=" py-20 px-6 md:px-16">
      <div className="text-center mb-12">
        <Title text1="What Our" text2="Clients Say" />
        <p className="mt-2 text-gray-500">
          Hear from fashion icons who love ForeverYou
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-8 shadow-lg border border-yellow-400 hover:border-yellow-500 hover:shadow-xl transition duration-300"
          >
            <FaQuoteLeft className="text-pink-500 text-3xl mb-4" />
            <p className="text-gray-700 text-lg mb-6">
              "{testimonial.message}"
            </p>
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 object-cover rounded-full border-2 border-pink-300"
              />
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
