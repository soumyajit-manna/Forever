import { NavLink } from "react-router-dom";

const links = [
  { to: "/add", number: "01", label: "Add product" },
  { to: "/list", number: "02", label: "Catalogue" },
  { to: "/orders", number: "03", label: "Orders" },
];

const Sidebar = () => (
  <aside className="admin-sidebar" aria-label="Store management">
    <p className="admin-sidebar-label">MANAGEMENT</p>
    <nav className="admin-nav">
      {links.map(({ to, number, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `admin-nav-link${isActive ? " is-active" : ""}`
          }
        >
          <span className="admin-nav-number">{number}</span>
          <span className="admin-nav-label">{label}</span>
          <span className="admin-nav-arrow" aria-hidden="true">↗</span>
        </NavLink>
      ))}
    </nav>
    <div className="admin-sidebar-note">
      <span className="admin-sidebar-dot" />
      <span>GOOD STYLE. GOOD DAYS.</span>
    </div>
  </aside>
);

export default Sidebar;
