import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../services/URL";
import "./css/Landing.css";
import Header from "../../Components/Header/Header";
import mars from "../../Images/mars.jpg";
import venus from "../../Images/venus.jpg";
import mercury from "../../Images/mercury.jpg";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

const Landing = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const [headerItems, setHeaderItems] = useState([]);
  const [filters, setFilters] = useState([]);

  const getAllPlanets = () => {
    let items = localStorage.getItem("cart");
    if (items) {
      items = items.split(",");
      setHeaderItems(items);
    }
    axios({
      url: URL + "/planets/",
      method: "GET",
    })
      .then((response) => {
        setAllPlanets(response.data);
      })
      .catch(() => props.error("Error retrieving data!"));
  };

  const getAllProducts = (filters) => {
    axios({
      url: URL + "/mountains/",
      method: "GET",
    })
      .then((response) => {
        let temp = response.data;
        if (filters && filters.length > 0) {
          temp = temp.filter((item) => filters.includes(item.planet_name));
        }
        setAllProducts(temp);
      })
      .catch(() => props.error("Error retrieving data!"));
  };

  const addToCart = (item) => {
    if (!headerItems.includes(item.mountain_id)) {
      let temp = headerItems;
      temp.push(item.mountain_id);
      setHeaderItems(temp);
      props.success("Added to cart!");
      localStorage.setItem("cart", headerItems);
    } else {
      props.warning("Item already in cart!");
    }
  };

  const filter = (fil) => {
    let temp = filters;
    if (temp.includes(fil)) {
      let index = temp.indexOf(fil);
      temp.splice(index, 1);
      setFilters(temp);
      getAllProducts(temp);
    } else {
      temp.push(fil);
      setFilters(temp);
      getAllProducts(temp);
    }
  };

  useEffect(getAllProducts, []);
  useEffect(getAllPlanets, []);

  return (
    <div>
      <div className="wrapper"></div>
      <Header items={headerItems} />
      <div className="landing">
        <div className="body">
          <div className="intro">
            <div className="container">
              <h2>Solar System Real Estate</h2>
              <h4>
                "A mountain i need, Solar System Real Estate is my friend
                indeed"
              </h4>
              <b>100% NOT A SCAM</b>
            </div>
          </div>
        </div>
        <div className="shop">
          <div className="content">
            <div className="menu">
              <h3>Filters</h3>
              <h4>Planets</h4>
              {allPlanets && allPlanets.length > 0
                ? allPlanets.map((planet) => (
                    <div className="item" key={planet.id}>
                      <a
                        onClick={() => filter(planet.name)}
                        className={
                          filters.includes(planet.name) ? "active" : ""
                        }
                      >
                        <div className="inside"></div>
                      </a>
                      {planet.name}
                    </div>
                  ))
                : ""}
            </div>
            <div className="body">
              {allProducts && allProducts.length > 0
                ? allProducts.map((product) => (
                    <div className="item-container" key={product.mountain_id}>
                      <img
                        src={
                          product.planet_name === "mars"
                            ? mars
                            : product.planet_name === "venus"
                            ? venus
                            : mercury
                        }
                      />
                      <h4>{product.mountain_name}</h4>
                      <p>{product.mountain_description}</p>
                      <div className="price">
                        <p>{"$" + product.mountain_price}</p>
                        <a
                          onClick={() => {
                            addToCart(product);
                          }}
                        >
                          <AddShoppingCartRoundedIcon />
                        </a>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
