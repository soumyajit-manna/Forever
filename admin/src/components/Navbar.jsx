import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <header className="admin-topbar">
      <Link className="admin-wordmark" to="/add" aria-label="FOREVER admin home">
        FOR<span className="admin-wordmark-accent">EVER</span>
        <span className="admin-wordmark-period">.</span>
      </Link>
      <div className="admin-topbar-copy">
        <span>THE FOREVER EDIT</span>
        <strong>STORE ADMINISTRATION</strong>
      </div>
      <button className="admin-logout" type="button" onClick={handleLogout}>
        <span>LOG OUT</span>
        <span aria-hidden="true">↗</span>
      </button>
    </header>
  );
};

Navbar.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Navbar;
