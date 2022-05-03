import React, { useEffect } from "react";
import "./css/Header.css";
import Logo from "../../Images/Logo.png";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Header = (props) => {
  const getLocalStorage = () => {};

  useEffect(getLocalStorage, [props]);

  return (
    <div className="header">
      <div className="content">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="control">
          <a onClick={() => (window.location.href = "/cart")}>
            <ShoppingCartOutlinedIcon />
            {props.items && props.items.length > 0 ? (
              <p>{props.items.length}</p>
            ) : (
              ""
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
