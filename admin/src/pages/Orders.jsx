import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../config";
import { toast } from "react-toastify";

const statusOptions = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllOrders = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders([...response.data.orders].reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order status updated.");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <section className="admin-data-section" aria-labelledby="orders-title">
      <div className="admin-section-heading admin-list-heading">
        <div>
          <p className="admin-section-kicker">THE FOREVER EDIT / FULFILMENT</p>
          <h2 id="orders-title">Every order, in motion.</h2>
        </div>
        <span className="admin-item-count">
          {String(orders.length).padStart(2, "0")} ORDERS
        </span>
      </div>

      <div className="admin-orders-list">
        {isLoading ? (
          <div className="admin-empty-state">
            <span className="admin-loading-mark" />
            <p>LOADING YOUR ORDERS</p>
          </div>
        ) : orders.length ? (
          orders.map((order) => (
            <article className="admin-order-card" key={order._id}>
              <div className="admin-order-index" aria-hidden="true">
                <span>ORDER</span>
                <strong>#{order._id.slice(-6).toUpperCase()}</strong>
              </div>

              <div className="admin-order-details">
                <p className="admin-order-items">
                  {order.items.map((item, index) => (
                    <span key={`${item.name}-${item.size}-${index}`}>
                      {item.name} <i>× {item.quantity}</i> <em>{item.size}</em>
                      {index < order.items.length - 1 ? <b>, </b> : null}
                    </span>
                  ))}
                </p>
                <strong className="admin-order-customer">
                  {order.address.firstName} {order.address.lastName}
                </strong>
                <p className="admin-order-address">
                  {order.address.street}, {order.address.city}, {order.address.state},{" "}
                  {order.address.country} - {order.address.zipcode}
                </p>
                <p className="admin-order-phone">{order.address.phone}</p>
              </div>

              <div className="admin-order-meta">
                <span>{order.items.length} {order.items.length === 1 ? "ITEM" : "ITEMS"}</span>
                <span>{order.paymentMethod}</span>
                <span className={order.payment ? "is-paid" : "is-pending"}>
                  {order.payment ? "PAID" : "PAYMENT PENDING"}
                </span>
                <span>{new Date(order.date).toLocaleDateString("en-IN")}</span>
              </div>

              <strong className="admin-order-total">
                {currency}{Number(order.amount).toLocaleString("en-IN")}
              </strong>

              <label className="admin-status-field">
                <span>DELIVERY STATUS</span>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  aria-label={`Delivery status for order ${order._id}`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>
            </article>
          ))
        ) : (
          <div className="admin-empty-state">
            <p className="admin-section-kicker">ALL CAUGHT UP</p>
            <h3>No orders to show.</h3>
            <p>New customer orders will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
};

Orders.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Orders;
