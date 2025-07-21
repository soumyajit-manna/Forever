import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-16 px-4 sm:px-8 lg:px-16">
      {/* Section Title */}
      <div className="text-center mb-10">
        <Title text1="STYLE" text2="SPOTLIGHT" />
        <p className="w-full sm:w-3/4 lg:w-1/2 mx-auto text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mt-2">
          Discover handpicked styles and timeless trends curated just for you.
          From casual comfort to elegant essentials, explore what’s new.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
