import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import URL from "../../services/URL";
import "./css/Checkout.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Checkout = (props) => {
  const [allMountains, setAllMountains] = useState([]);
  const [price, setPrice] = useState([]);

  const getAllMountainsById = async () => {
    let mountains = [];
    let items = localStorage.getItem("cart");
    let newItems = [];
    if (items) {
      items = items.split(",");
      for (let i = 0; i < items.length; i++) {
        await axios({
          method: "POST",
          url: URL + "/mountains/getMountainById",
          data: {
            id: items[i],
          },
        }).then((response) => {
          if (response.data.length < 1) {
            props.error(`Item with id ${items[i]} is no longer available`);
          } else {
            mountains.push(response.data[0]);
            newItems.push(items[i]);
          }
        });
        localStorage.setItem("cart", newItems);
      }
      let sum = 0;
      for (let i = 0; i < mountains.length; i++) {
        sum += parseInt(mountains[i].mountain_price);
      }
      setPrice(sum);
      setAllMountains(mountains);
    }
  };

  const deleteFromCart = (index) => {
    let temp = allMountains;
    temp.splice(index, 1);
    setAllMountains(temp);
    let items = localStorage.getItem("cart").split(",");
    items.splice(index, 1);
    localStorage.setItem("cart", items);
    window.location.href = window.location.href;
  };

  const buyItems = () => {
    let items = localStorage.getItem("cart").split(",");
    axios({
      method: "POST",
      url: URL + "/mountains/buy",
      data: {
        ids: items,
      },
    }).then((response) => {
      window.location.href = "/";
      localStorage.clear();
    });
  };

  useEffect(() => {
    getAllMountainsById();
  }, []);

  return (
    <div>
      <Header
        items={
          localStorage.getItem("cart")
            ? localStorage.getItem("cart").split(",")
            : ""
        }
      />
      <div className="checkout">
        <div className="content">
          <table>
            <tr>
              <th>Item ID</th>
              <th>Planet Name</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
            {allMountains && allMountains.length > 0
              ? allMountains.map((item, index) => (
                  <tr key={item.mountain_id}>
                    <td>{item.mountain_id}</td>
                    <td>{item.planet_name}</td>
                    <td>{item.mountain_name}</td>
                    <td style={{ maxWidth: "150px" }}>
                      {item.mountain_description.substring(0, 50) + "..."}
                    </td>
                    <td>{item.mountain_price}</td>
                    <td>
                      <a onClick={() => deleteFromCart(index)}>
                        <DeleteOutlineOutlinedIcon />
                      </a>
                    </td>
                  </tr>
                ))
              : ""}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <th>Total</th>
              <td>{price}</td>
            </tr>
          </table>
          <div className="button-wrapper">
            {allMountains.length > 0 ? (
              <button onClick={() => buyItems()}>Buy</button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
