import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CompanyLogo from "../assets/company_logo.png";
import { TbSquareToggle } from "react-icons/tb";
import { Tooltip } from "react-tooltip";

export default function Navbar() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img
            alt="Company logo"
            className="h-10 inline"
            src={CompanyLogo}
          ></img>
        </NavLink>

        <NavLink
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to="/create"
        >
          Create Employee
        </NavLink>

        <NavLink
          className={`inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 ${
            isToggled ? "active" : ""
          }`}
          to={isToggled ? "/department" : "/"}
          onClick={handleToggle}
          data-tooltip-id="toggle-tooltip"
          data-tooltip-content={
            isToggled ? "Toggle Home View" : "Toggle Department View"
          }
        >
          <TbSquareToggle />
        </NavLink>

        <Tooltip id="toggle-tooltip" />
      </nav>
    </div>
  );
}
