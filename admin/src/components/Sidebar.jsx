import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const navLinkClasses =
    "flex items-center gap-3 px-4 py-2 rounded-l-full transition-all duration-300 font-medium hover:bg-pink-100 hover:text-pink-600";

  const activeClassName = "bg-pink-500 text-white hover:bg-pink-600";

  return (
    <div className="w-[18%] min-h-screen bg-pink-50 shadow-lg border-r border-pink-200">
      <div className="flex flex-col gap-4 pt-10 pl-6 text-[15px]">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `${navLinkClasses} ${isActive ? activeClassName : ""}`
          }
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add Icon" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `${navLinkClasses} ${isActive ? activeClassName : ""}`
          }
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="List Icon" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `${navLinkClasses} ${isActive ? activeClassName : ""}`
          }
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="Orders Icon" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
