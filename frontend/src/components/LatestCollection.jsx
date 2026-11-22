import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="spotlight-section my-16">
      <div className="spotlight-heading">
        <div>
          <p className="spotlight-kicker">
            <span>01</span>
            THE NEW WARDROBE
          </p>
          <h2>
            Style <em>spotlight</em>
            <span className="spotlight-period">.</span>
          </h2>
        </div>

        <div className="spotlight-aside">
          <p>
            Fresh finds and everyday favourites, thoughtfully picked to make
            getting dressed feel more like you.
          </p>
          <Link to="/collection" className="spotlight-link">
            <span>SHOP THE EDIT</span>
            <span className="spotlight-arrow">
              <FiArrowUpRight aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>

      <div className="spotlight-rule" />

      <div className="spotlight-product-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
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
    </section>
  );
};

export default LatestCollection;
