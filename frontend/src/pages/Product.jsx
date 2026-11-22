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
    <main className="product-page">
      <section className="product-detail-layout">
        <div className="product-gallery">
          <div className="product-thumbnails">
            {productData.image.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setImage(item)}
                className={`product-thumbnail ${
                  image === item ? "is-selected" : ""
                }`}
                aria-label={`View product image ${index + 1}`}
                aria-pressed={image === item}
              >
                <img src={item} alt="" />
              </button>
            ))}
          </div>
          <div className="product-featured-image">
            <img src={image} alt={productData.name} />
          </div>
        </div>

        <div className="product-information">
          <p className="product-breadcrumb">
            THE COLLECTION <span>/</span> {productData.category}
          </p>
          <h1>{productData.name}</h1>

          <div className="product-rating-row">
            <div className="product-rating">
              <div className="product-stars" aria-label="Rated 4 out of 5">
                <img src={assets.star_icon} alt="" />
                <img src={assets.star_icon} alt="" />
                <img src={assets.star_icon} alt="" />
                <img src={assets.star_icon} alt="" />
                <img src={assets.star_dull_icon} alt="" />
              </div>
              <span>(122)</span>
            </div>

            <div className="product-share-actions">
              <button
                type="button"
                onClick={handleShare}
                title="Share"
                aria-label="Share product"
              >
                <FaShareAlt aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleWhatsAppShare}
                title="Share on WhatsApp"
                aria-label="Share product on WhatsApp"
              >
                <FaWhatsapp aria-hidden="true" />
              </button>
            </div>
          </div>

          <p className="product-price">
            {currency}
            {productData.price}
          </p>
          <p className="product-description-copy">
            {productData.description}
          </p>
          <div className="product-size-select">
            <p className="product-field-label">CHOOSE YOUR SIZE</p>
            <div className="product-size-options">
              {productData.sizes.map((item, index) => {
                const isSelected = item === size;

                return (
                  <button
                    type="button"
                    onClick={() => setSize(item)}
                    className={isSelected ? "is-selected" : ""}
                    key={index}
                    aria-pressed={isSelected}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="product-purchase-actions">
            <button
              type="button"
              onClick={handleAddToCart}
              className="product-add-button"
            >
              ADD TO CART
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="product-buy-button"
            >
              BUY NOW
            </button>
          </div>

          <div className="product-promises">
            <p>
              <span>01</span> 100% Original product.
            </p>
            <p>
              <span>02</span> Cash on delivery is available.
            </p>
            <p>
              <span>03</span> Easy return and exchange within 7 days.
            </p>
          </div>
        </div>
      </section>

      <section className="product-description-panel">
        <div className="product-description-tabs">
          <span>DESCRIPTION</span>
          <span>REVIEWS (122)</span>
        </div>
        <div className="product-description-body">
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
      </section>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </main>
  ) : (
    <div className="product-loading" aria-label="Loading product" />
  );
};

export default Product;
