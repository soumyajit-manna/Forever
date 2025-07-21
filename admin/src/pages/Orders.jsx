import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <h3 className="text-2xl md:text-3xl font-bold text-pink-600 mb-6">
        📦 Your Orders
      </h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 bg-white border border-pink-200 shadow-md rounded-xl p-5 md:p-8 transition hover:shadow-lg duration-200"
          >
            <img className="w-12" src={assets.parcel_icon} alt="parcel" />

            {/* Order Details */}
            <div>
              <div className="mb-3 text-sm">
                {order.items.map((item, index) => (
                  <p className="py-0.5" key={index}>
                    {item.name} x {item.quantity}{" "}
                    <span className="text-gray-500">({item.size})</span>
                    {index !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>

              <p className="text-base font-medium text-pink-600">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <p className="text-gray-600 text-sm">
                {order.address.street}, {order.address.city},{" "}
                {order.address.state}, {order.address.country} -{" "}
                {order.address.zipcode}
              </p>
              <p className="text-sm text-gray-600">{order.address.phone}</p>
            </div>

            {/* Payment & Method Info */}
            <div className="text-sm space-y-1">
              <p>
                🛍️ Items:{" "}
                <span className="font-medium">{order.items.length}</span>
              </p>
              <p>💳 Method: {order.paymentMethod}</p>
              <p>
                💰 Payment:{" "}
                {order.payment ? (
                  <span className="text-green-600 font-semibold">Done</span>
                ) : (
                  <span className="text-red-500 font-semibold">Pending</span>
                )}
              </p>
              <p>📅 Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Total Amount */}
            <div className="text-lg font-bold text-pink-700">
              {currency}
              {order.amount}
            </div>

            {/* Status Dropdown */}
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="bg-pink-50 border border-pink-300 text-pink-800 font-semibold rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
