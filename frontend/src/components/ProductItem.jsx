import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={`/product/${id}`}
      className="product-card block overflow-hidden"
    >
      <div className="overflow-hidden bg-[#efede7]">
        <img
          src={image[0]}
          alt={name}
          className="product-card-image w-full object-cover"
        />
      </div>
      <div className="product-card-copy">
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
