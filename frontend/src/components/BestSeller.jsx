import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

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
    <section className="bestseller-section">
      <div className="bestseller-inner">
        <div className="bestseller-heading">
          <div>
            <p className="bestseller-kicker">
              <span>03</span>
              THE MOST-LOVED EDIT
            </p>
            <h2>
              The most <em>wanted.</em>
            </h2>
          </div>

          <div className="bestseller-aside">
            <p>
              The pieces you reach for on repeat: easy to wear, hard to forget,
              and ready for wherever the day takes you.
            </p>
            <Link to="/collection" className="bestseller-link">
              <span>SHOP BESTSELLERS</span>
              <span className="bestseller-arrow">
                <FiArrowUpRight aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        <div className="bestseller-product-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
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
    </section>
  );
};

export default BestSeller;
