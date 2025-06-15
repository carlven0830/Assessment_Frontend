import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLink } from "../../models/data/navLinkRoute";
import { HiMenu } from "react-icons/hi";
import "./sideNav.css";

function SideNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sideNavContainer">
        <div className="sideNavLogo">
          <h2>MyProject</h2>
          <button onClick={() => setOpen(!open)} className="toggleButton">
            <HiMenu className="logo"></HiMenu>
          </button>
        </div>
        <div className="sideNavMenu">
          {navLink.map((link) => (
            <NavLink key={link.path} to={link.path} className="sideNavLink">
              {link.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}

export default SideNav;
