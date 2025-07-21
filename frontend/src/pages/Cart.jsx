import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-4 sm:px-8 md:px-20 bg-[#fdfdfd] min-h-screen">
      <div className="text-3xl font-semibold text-gray-800 mb-10">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border hover:shadow-lg transition duration-300"
            >
              {/* Product Image & Info */}
              <div className="flex items-center gap-5 w-full sm:w-[60%]">
                <img
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    {productData.name}
                  </h3>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="font-semibold">
                      {currency}
                      {productData.price}
                    </span>
                    <span className="px-2 py-1 border rounded-md bg-gray-50">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="flex items-center gap-4">
                <input
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (!val || val < 1) return;
                    updateQuantity(item._id, item.size, val);
                  }}
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="w-16 sm:w-20 border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-black/60 transition"
                />

                {/* Delete Icon */}
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-5 cursor-pointer opacity-70 hover:opacity-100 transition"
                  src={assets.bin_icon}
                  alt="Delete"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Section */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px] space-y-6">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold tracking-wide px-8 py-3 rounded-md transition duration-300"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
