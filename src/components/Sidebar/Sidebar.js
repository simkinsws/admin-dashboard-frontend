/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "Circle-icons-computer.svg";
import { routesAdmin } from "routes";
import { routesUser } from "routes";

var ps;

function Sidebar(props) {
  const [isRole, setIsRole] = useState("admin");
  const [routes, setRoutes] = useState([]);
  const location = useLocation();
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  useEffect(() => {
    if(isRole === "admin") {
      setRoutes(props.routes[0]);
    } else {
      setRoutes(props.routes[1]);
    }
  },[isRole])
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a
          href="https://www.creative-tim.com"
          className="simple-text logo-mini"
        >
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a
          href="https://www.creative-tim.com"
          className="simple-text logo-normal"
        >
          Munique-Panel
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>          
          {routes.map((prop, key) => {
            console.log(prop)           
              return(        
                <li
                  className={
                    activeRoute(prop.path) 
                  }
                  key={key}
                >
                  <NavLink to={prop.layout + prop.path} className="nav-NavLink">
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              )        
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
