import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={`/product/${id}`}
      className="block bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
    >
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="text-sm text-gray-700 font-medium truncate">{name}</p>
        <p className="text-sm font-semibold text-red-600 mt-1">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
