import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <main className="orders-page">
      <header className="orders-heading">
        <div>
          <p>THE FOREVER ACCOUNT</p>
          <h1>
            My <em>orders.</em>
          </h1>
        </div>
        <span>{orderData.length.toString().padStart(2, "0")} ITEMS</span>
      </header>

      <section className="orders-list" aria-label="Your orders">
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <article className="order-card" key={index}>
              <img
                className="order-card-image"
                src={item.image[0]}
                alt={item.name}
              />

              <div className="order-card-details">
                <p className="order-card-kicker">
                  ORDER ITEM / {String(index + 1).padStart(2, "0")}
                </p>
                <h2>{item.name}</h2>
                <div className="order-card-meta">
                  <p>
                    <span>PRICE</span>
                    <strong>
                      {currency}
                      {item.price}
                    </strong>
                  </p>
                  <p>
                    <span>QUANTITY</span>
                    <strong>{item.quantity}</strong>
                  </p>
                  <p>
                    <span>SIZE</span>
                    <strong>{item.size}</strong>
                  </p>
                  <p>
                    <span>PAYMENT</span>
                    <strong>{item.paymentMethod}</strong>
                  </p>
                </div>
                <p className="order-card-date">
                  ORDERED <span>{new Date(item.date).toDateString()}</span>
                </p>
              </div>

              <div className="order-card-actions">
                <span
                  className={`order-status ${
                    item.status === "Delivered"
                      ? "is-delivered"
                      : item.status === "Pending"
                      ? "is-pending"
                      : item.status === "Cancelled"
                      ? "is-cancelled"
                      : ""
                  }`}
                >
                  {item.status}
                </span>
                <button type="button" onClick={loadOrderData}>
                  UPDATE STATUS
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="orders-empty">
            <span>NO ORDER NOTES YET</span>
            <h2>Your next favorite is waiting to be found.</h2>
            <p>Your purchases and delivery updates will appear here.</p>
            <Link to="/collection">EXPLORE THE COLLECTION</Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default Orders;
