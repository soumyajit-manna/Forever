import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-3 text-lg font-semibold text-pink-700">
        All Products List
      </p>

      <div className="flex flex-col gap-2">
        {/* Table Headers */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 bg-pink-100 rounded-lg shadow text-sm font-medium text-pink-800">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 p-3 border rounded-lg bg-white hover:shadow-md transition duration-300 ease-in-out"
          >
            <img
              className="w-14 h-14 object-cover rounded-md border border-pink-200"
              src={item.image[0]}
              alt={item.name}
            />
            <p className="text-gray-700 font-medium">{item.name}</p>
            <p className="text-gray-500">{item.category}</p>
            <p className="text-gray-600 font-semibold">
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-pink-600 hover:text-red-500 text-right md:text-center cursor-pointer text-lg font-bold"
              title="Delete"
            >
              ×
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
