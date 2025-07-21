import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const updateBestSellers = () => {
      const isMobile = window.innerWidth <= 640; // Tailwind's sm: is 640px
      const bestProduct = products.filter((item) => item.bestseller);
      const slicedProducts = isMobile
        ? bestProduct.slice(0, 6)
        : bestProduct.slice(0, 5);
      setBestSeller(slicedProducts);
    };

    updateBestSellers(); // run once on mount or when products change

    window.addEventListener("resize", updateBestSellers);
    return () => window.removeEventListener("resize", updateBestSellers);
  }, [products]);

  return (
    <div className="my-16 px-4 sm:px-8 lg:px-16">
      {/* Section Title */}
      <div className="text-center mb-10">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-full sm:w-3/4 lg:w-1/2 mx-auto text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mt-2">
          These are the products everyone is loving! Explore our most popular
          picks that combine style, comfort, and trend.
        </p>
      </div>

      {/* Best Seller Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
