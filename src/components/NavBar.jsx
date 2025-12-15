import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import logo from "../assets/logo/argentBankLogo.png";

export default function NavBar() {
  const { token, profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {token ? (
          <span 
            className="main-nav-item" 
            onClick={handleLogout} 
            style={{ cursor: "pointer" }}
          >
            <i className="fa fa-user-circle"></i>
            {profile ? ` ${profile.firstName} (Logout)` : "Logout"}
          </span>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
