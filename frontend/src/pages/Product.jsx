import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import { FaWhatsapp, FaShareAlt } from "react-icons/fa"; // <-- NEW

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const navigate = useNavigate();

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      toast.error("Please select a size first");
      return;
    }
    addToCart(productData._id, size);
    toast.success("Item added to cart!");
  };

  const handleBuyNow = () => {
    if (!size) {
      toast.error("Please select a size first");
      return;
    }
    addToCart(productData._id, size);
    navigate("/cart");
  };

  const handleWhatsAppShare = () => {
    const url = window.location.href;
    const productName = productData?.name || "Check this out!";
    const message = `${productName} - ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // NEW: Web Share API
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: productData.name,
          text: "Check out this product!",
          url: window.location.href,
        });
      } else {
        toast.info("Share not supported in this browser.");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-semibold text-2xl mt-2">{productData.name}</h1>

          {/* Rating and Share Icons */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_dull_icon} alt="" className="w-3.5" />
              <p className="pl-2">(122)</p>
            </div>

            {/* Share and WhatsApp Icons */}
            <div className="flex gap-3 ml-4 text-xl text-gray-600 cursor-pointer">
              <FaShareAlt onClick={handleShare} title="Share" />
              <FaWhatsapp
                onClick={handleWhatsAppShare}
                title="Share on WhatsApp"
                className="text-green-600"
              />
            </div>
          </div>

          <p className="mt-5 text-3xl text-red-600 font-bold">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-600 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 ${
                    item === size
                      ? "border-pink-600 bg-pink-100 font-medium"
                      : "bg-gray-100 text-gray-700 hover:bg-pink-100 hover:border-pink-500"
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="bg-pink-600 hover:bg-pink-700 transition text-white px-8 py-3 text-sm"
            >
              ADD TO CART
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-white border border-pink-500 text-pink-600 hover:bg-pink-50 transition px-8 py-3 text-sm"
            >
              BUY NOW
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>✅ 100% Original product.</p>
            <p>💰 Cash on delivery is available on this product.</p>
            <p>🔁 Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Welcome to FOREVER. – your ultimate destination for trend-forward
            fashion. Each piece in our collection is thoughtfully curated to
            combine style, comfort, and timeless appeal.
          </p>
          <p>
            Whether you're redefining your everyday look or dressing for a
            statement moment, FOREVER. offers versatile and quality-crafted
            fashion made to inspire confidence. Experience effortless style,
            made for every mood and moment.
          </p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
