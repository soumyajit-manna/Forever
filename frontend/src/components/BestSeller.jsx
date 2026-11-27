import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const BestSeller = () => {
  const { products, productsLoading } = useContext(ShopContext);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const bestSeller = products
    .filter((item) => item.bestseller)
    .slice(0, isMobile ? 6 : 5);

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
          {productsLoading ? (
            <div className="products-loading" role="status">
              <span className="products-loading-spinner" aria-hidden="true" />
              <p>Finding the pieces everyone loves...</p>
            </div>
          ) : bestSeller.map((item, index) => (
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
