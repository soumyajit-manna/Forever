import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-4xl p-6 mx-auto bg-white rounded-xl shadow-lg flex flex-col gap-5"
    >
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Upload Images</p>
        <div className="flex gap-3 flex-wrap">
          {[image1, image2, image3, image4].map((img, index) => (
            <label
              key={index}
              htmlFor={`image${index + 1}`}
              className="cursor-pointer"
            >
              <img
                className="w-24 h-24 rounded-lg border object-cover shadow"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt={`upload-${index}`}
              />
              <input
                onChange={(e) => {
                  const setter = [setImage1, setImage2, setImage3, setImage4][
                    index
                  ];
                  setter(e.target.files[0]);
                }}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Product Description
        </p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          rows="4"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
            type="number"
            placeholder="₹25"
            required
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Available Sizes
        </p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`px-4 py-1 rounded-full text-sm cursor-pointer transition-all border ${
                  sizes.includes(size)
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-pink-100 hover:border-pink-300"
                }`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 items-center mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="accent-pink-500"
        />
        <label
          htmlFor="bestseller"
          className="text-sm font-medium text-gray-700"
        >
          Mark as Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-32 py-2 mt-4 bg-pink-500 hover:bg-pink-600 transition-all text-white rounded-md shadow"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
