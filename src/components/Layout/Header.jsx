import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg d-flex justify-content-between bg-dark text-light">
      <NavLink className="navbar-brand" to="/">
        Futuredeck
      </NavLink>
      <nav>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/user/:id">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/shop">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cart">
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
