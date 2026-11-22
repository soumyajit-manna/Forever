import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let sorted = [...filterProducts];
    switch (sortType) {
      case "low-high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }
    setFilterProducts(sorted);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <main className="collection-page">
      <aside className="collection-sidebar">
        <button
          type="button"
          aria-expanded={showFilter}
          onClick={() => setShowFilter(!showFilter)}
          className="collection-filter-toggle"
        >
          <span>
            <small>REFINE YOUR EDIT</small>
            <strong>Filters</strong>
          </span>
          <img
            className={`collection-filter-arrow sm:hidden transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt=""
          />
        </button>

        <div className={`collection-filter-panel ${showFilter ? "is-open" : ""}`}>
          <div className="collection-filter-group">
            <p className="collection-filter-label">CATEGORY</p>
            <div className="collection-filter-options">
              {["Men", "Women", "Kids"].map((label) => (
                <label key={label}>
                  <input
                    type="checkbox"
                    value={label}
                    onChange={toggleCategory}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="collection-filter-group">
            <p className="collection-filter-label">TYPE</p>
            <div className="collection-filter-options">
              {["Topwear", "Bottomwear", "Winterwear"].map((label) => (
                <label key={label}>
                  <input
                    type="checkbox"
                    value={label}
                    onChange={toggleSubCategory}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <section className="collection-content">
        <div className="collection-heading">
          <div>
            <p className="collection-kicker">THE FOREVER EDIT</p>
            <h1>
              All <em>collections.</em>
            </h1>
          </div>
          <div className="collection-sort">
            <span className="collection-product-count">
              {filterProducts.length} PIECES
            </span>
            <label htmlFor="collection-sort">SORT BY</label>
            <select
              id="collection-sort"
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="relavent">Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="collection-product-grid">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <div className="collection-empty">
              <span>THE EDIT IS QUIET</span>
              <p>No pieces found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Collection;
