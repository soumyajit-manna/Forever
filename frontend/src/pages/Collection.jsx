import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
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
    <div className="flex flex-col sm:flex-row gap-6 pt-16 px-4 max-w-7xl mx-auto">
      {/* Sidebar Filter */}
      <aside className="min-w-[200px]">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="text-xl font-semibold mb-4 flex items-center justify-between cursor-pointer sm:cursor-default sm:mb-6 text-pink-600"
        >
          Filters
          <img
            className={`h-3 sm:hidden transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category */}
        <div
          className={`transition-all ${
            showFilter ? "block" : "hidden"
          } sm:block border-t pt-4 border-gray-200`}
        >
          <p className="text-sm font-semibold text-pink-600 mb-3">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["Men", "Women", "Kids"].map((label) => (
              <label key={label} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={label}
                  onChange={toggleCategory}
                  className="accent-pink-500 cursor-pointer"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory */}
        <div
          className={`transition-all mt-6 ${
            showFilter ? "block" : "hidden"
          } sm:block border-t pt-4 border-gray-200`}
        >
          <p className="text-sm font-semibold text-pink-600 mb-3">TYPE</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((label) => (
              <label key={label} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={label}
                  onChange={toggleSubCategory}
                  className="accent-pink-500 cursor-pointer"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="cursor-pointer border border-pink-500 text-sm rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            <p className="text-center col-span-full text-gray-400">
              No products found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Collection;
