import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

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
    <div className="border-t pt-16 px-4 sm:px-8">
      <div className="text-3xl font-semibold mb-10 text-center">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="transition-all duration-300 hover:shadow-lg hover:border-blue-400 bg-white border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-5 text-gray-800 text-sm md:text-base w-full md:w-2/3">
              <img
                className="w-20 h-20 object-cover rounded-lg shadow-md border"
                src={item.image[0]}
                alt={item.name}
              />
              <div className="space-y-1">
                <p className="font-semibold text-lg">{item.name}</p>
                <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                  <p>
                    Price:{" "}
                    <span className="font-medium">
                      {currency}
                      {item.price}
                    </span>
                  </p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p>
                  Date:{" "}
                  <span className="text-gray-500">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p>
                  Payment:{" "}
                  <span className="text-gray-500">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end md:w-1/3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span
                  className={`w-3 h-3 rounded-full ${
                    item.status === "Delivered"
                      ? "bg-green-500"
                      : item.status === "Pending"
                      ? "bg-yellow-400"
                      : item.status === "Cancelled"
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }`}
                ></span>
                <p className="capitalize">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="px-5 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm shadow-md transition"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
