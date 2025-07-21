import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    showSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const location = useLocation();

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", visible);
    return () => document.body.classList.remove("overflow-hidden");
  }, [visible]);

  const navLinkClass = `flex flex-col items-center gap-1 text-sm font-medium text-gray-700 hover:text-pink-500 transition`;

  const handleSearchToggle = () => {
    if (location.pathname.includes("collection")) {
      setShowSearch((prev) => !prev);
    } else {
      navigate("/collection");
      setShowSearch(true);
    }
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium px-4 sm:px-8 border-b border-gray-100 bg-white shadow-sm z-50">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden sm:flex gap-6">
        {[
          { path: "/", label: "HOME" },
          { path: "/collection", label: "COLLECTION" },
          { path: "/about", label: "ABOUT" },
          { path: "/contact", label: "CONTACT" },
        ].map(({ path, label }) => (
          <NavLink
            to={path}
            key={path}
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? "text-pink-600" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <p>{label}</p>
                {isActive && (
                  <hr className="w-2/4 h-[2px] bg-pink-500 rounded-full border-none" />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* External Admin Panel */}
        <li className={`${navLinkClass}`}>
          <a
            href="https://forever-admin-seven-lovat.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1"
          >
            <p>ADMIN PANEL</p>
          </a>
        </li>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={handleSearchToggle}
          src={assets.search_icon}
          className="w-5 cursor-pointer hover:opacity-70 transition"
          alt="search"
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer hover:opacity-70 transition"
            src={assets.profile_icon}
            alt="profile"
          />
          {token && (
            <div className="hidden group-hover:block absolute right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-40 py-4 px-5 bg-white text-gray-600 rounded-xl shadow-lg border border-pink-100">
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-pink-600"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 hover:opacity-70 transition"
            alt="cart"
          />
          <p className="absolute -right-1 -bottom-1 w-4 h-4 bg-pink-600 text-white text-[8px] rounded-full flex items-center justify-center">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden hover:opacity-70 transition"
          alt="menu"
        />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[60] bg-white transition-all duration-300 ease-in-out shadow-lg ${
          visible ? "w-full sm:w-2/3" : "w-0"
        }`}
      >
        <div className="h-full overflow-y-auto flex flex-col text-gray-800 text-sm tracking-wide">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-5 border-b border-gray-100 hover:bg-gray-50"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="back"
            />
            <p>Back</p>
          </div>

          {[
            { to: "/", label: "HOME" },
            { to: "/collection", label: "COLLECTION" },
            { to: "/about", label: "ABOUT" },
            { to: "/contact", label: "CONTACT" },
          ].map(({ to, label }) => (
            <NavLink
              onClick={() => setVisible(false)}
              to={to}
              key={to}
              className="py-4 pl-6 border-b border-gray-100 hover:bg-pink-50 hover:text-pink-600 transition"
            >
              {label}
            </NavLink>
          ))}

          {/* Admin panel in Sidebar */}
          <a
            href="https://forever-admin-seven-lovat.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 pl-6 border-b border-gray-100 hover:bg-pink-50 hover:text-pink-600 transition"
            onClick={() => setVisible(false)}
          >
            ADMIN PANEL
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
