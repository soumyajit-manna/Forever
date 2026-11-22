import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FiGrid, FiX } from "react-icons/fi";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
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

  const handleSearchToggle = () => {
    if (location.pathname.includes("collection")) {
      setShowSearch((prev) => !prev);
    } else {
      navigate("/collection");
      setShowSearch(true);
    }
  };

  return (
    <>
      <div className="site-nav flex items-center justify-between py-5 font-medium px-2 sm:px-4 border-b border-gray-100 bg-white shadow-sm z-50">
      {/* Logo */}
      <Link to="/" className="site-nav-brand" aria-label="Forever home">
        <span className="site-nav-wordmark">
          FOR<span className="wordmark-accent">EVER</span>
          <span className="wordmark-period">.</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <ul className="site-nav-links hidden sm:flex gap-6">
        {[
          { path: "/", label: "HOME" },
          { path: "/collection", label: "COLLECTION" },
          { path: "/about", label: "ABOUT" },
          { path: "/contact", label: "CONTACT" },
        ].map(({ path, label }, index) => (
          <NavLink
            to={path}
            key={path}
            className={({ isActive }) =>
              `site-nav-link ${isActive ? "is-active" : ""}`
            }
          >
            <span className="site-nav-link-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="site-nav-link-label">{label}</span>
            <span className="site-nav-link-arrow" aria-hidden="true">
              ↗
            </span>
          </NavLink>
        ))}

      </ul>

      {/* Icons */}
      <div className="site-nav-actions flex items-center gap-6">
        <a
          href="https://forever-admin-seven-lovat.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-quick-link nav-icon-button"
          aria-label="Admin panel"
        >
          <FiGrid aria-hidden="true" />
          <span className="admin-tooltip" role="tooltip">
            Admin Panel
          </span>
        </a>
        <button
          type="button"
          onClick={handleSearchToggle}
          className="nav-icon-button"
          aria-label="Search"
        >
          <img src={assets.search_icon} className="nav-action-image" alt="" />
        </button>

        <div className="nav-profile group relative">
          <button
            type="button"
            onClick={() => (token ? null : navigate("/login"))}
            className="nav-icon-button"
            aria-label="Profile"
          >
            <img
              className="nav-action-image"
              src={assets.profile_icon}
              alt=""
            />
          </button>
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

        <Link
          to="/cart"
          className="nav-icon-button nav-cart-link relative"
          aria-label={`Shopping cart, ${getCartCount()} items`}
        >
          <img
            src={assets.cart_icon}
            className="nav-action-image"
            alt=""
          />
          <p className="nav-cart-count">
            {getCartCount()}
          </p>
        </Link>

        <button
          type="button"
          onClick={() => setVisible(true)}
          className="nav-icon-button nav-menu-button sm:hidden"
          aria-label="Open menu"
          aria-expanded={visible}
          aria-controls="mobile-navigation-drawer"
        >
          <img src={assets.menu_icon} className="nav-action-image" alt="" />
        </button>
      </div>

      </div>

      {/* Sidebar */}
      <div
        id="mobile-navigation-drawer"
        className={`site-nav-drawer${visible ? " is-open" : ""}`}
        aria-hidden={!visible}
      >
        <div className="mobile-drawer-shell">
          <header className="mobile-drawer-header">
            <Link
              to="/"
              className="mobile-drawer-wordmark"
              aria-label="Forever home"
              onClick={() => setVisible(false)}
            >
              FOR<span className="wordmark-accent">EVER</span>
              <span className="wordmark-period">.</span>
            </Link>
            <button
              type="button"
              className="mobile-drawer-close"
              aria-label="Close menu"
              onClick={() => setVisible(false)}
            >
              <FiX aria-hidden="true" />
            </button>
          </header>

          <div className="mobile-drawer-content">
            <div className="mobile-drawer-intro">
              <p className="mobile-drawer-kicker">THE FOREVER EDIT / 01</p>
              <h2>Where to next?</h2>
            </div>

            <nav className="mobile-drawer-links" aria-label="Mobile navigation">
              {[
                { to: "/", label: "HOME" },
                { to: "/collection", label: "COLLECTION" },
                { to: "/about", label: "ABOUT" },
                { to: "/contact", label: "CONTACT" },
              ].map(({ to, label }, index) => (
                <NavLink
                  onClick={() => setVisible(false)}
                  to={to}
                  key={to}
                  className={({ isActive }) =>
                    `mobile-drawer-link${isActive ? " is-active" : ""}`
                  }
                >
                  <span className="mobile-drawer-link-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="mobile-drawer-link-label">{label}</span>
                  <span className="mobile-drawer-link-arrow" aria-hidden="true">
                    ↗
                  </span>
                </NavLink>
              ))}

              <a
                href="https://forever-admin-seven-lovat.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-drawer-link mobile-drawer-admin"
                onClick={() => setVisible(false)}
              >
                <span className="mobile-drawer-link-number" aria-hidden="true">
                  05
                </span>
                <span className="mobile-drawer-link-label">ADMIN PANEL</span>
                <span className="mobile-drawer-link-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </nav>
          </div>

          <footer className="mobile-drawer-footer">
            <span>GOOD STYLE. GOOD DAYS.</span>
            <span>FOREVER · 2025</span>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Navbar;
