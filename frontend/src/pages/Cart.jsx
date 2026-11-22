import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

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
    <main className="cart-page">
      <header className="cart-heading">
        <div>
          <p>YOUR FOREVER BAG</p>
          <h1>
            Your <em>cart.</em>
          </h1>
        </div>
        <span>
          {cartData.length.toString().padStart(2, "0")}{" "}
          {cartData.length === 1 ? "PIECE" : "PIECES"}
        </span>
      </header>

      <div className="cart-layout">
        <section className="cart-items" aria-label="Cart items">
          {cartData.length > 0 ? (
            cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id
              );

              return (
                <article className="cart-item" key={index}>
                  <img
                    className="cart-item-image"
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div className="cart-item-details">
                    <p className="cart-item-category">
                      {productData.category} / {productData.subCategory}
                    </p>
                    <h2>{productData.name}</h2>
                    <p className="cart-item-price">
                      {currency}
                      {productData.price}
                    </p>
                    <div className="cart-item-size">
                      <span>SIZE</span>
                      <strong>{item.size}</strong>
                    </div>
                  </div>

                  <div className="cart-item-controls">
                    <label>
                      <span>QUANTITY</span>
                      <input
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (!val || val < 1) return;
                          updateQuantity(item._id, item.size, val);
                        }}
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                        aria-label={`Quantity for ${productData.name}`}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      aria-label={`Remove ${productData.name} from cart`}
                    >
                      <img src={assets.bin_icon} alt="" />
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="cart-empty">
              <span>YOUR BAG IS WAITING</span>
              <h2>A little room for something you love.</h2>
              <p>Explore the edit and find your next everyday favorite.</p>
              <Link to="/collection">DISCOVER THE COLLECTION</Link>
            </div>
          )}
        </section>

        <aside className="cart-summary">
          <p className="cart-summary-kicker">A CLEAR VIEW OF YOUR ORDER</p>
          <CartTotal />
          <button
            type="button"
            onClick={() => navigate("/place-order")}
            className="cart-checkout-button"
          >
            <span>PROCEED TO CHECKOUT</span>
            <span aria-hidden="true">↗</span>
          </button>
          <Link className="cart-continue-link" to="/collection">
            CONTINUE SHOPPING
          </Link>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
