import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    getCartCount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (getCartCount() === 0) {
      toast.info("Your cart is empty right now. Add an item before placing an order.");
      return;
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // API Calls for COD
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/verify?method=cod");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="checkout-page">
      <header className="checkout-heading">
        <p>FOREVER / CHECKOUT</p>
        <h1>
          Delivery <em>information.</em>
        </h1>
        <span>A few details to get your order on its way.</span>
      </header>

      <div className="checkout-layout">
        <section className="checkout-delivery">
          <div className="checkout-section-heading">
            <span>01</span>
            <div>
              <p>DELIVERY DETAILS</p>
              <h2>Where should we send it?</h2>
            </div>
          </div>

          <div className="checkout-fields">
            <label className="checkout-field">
              <span>FIRST NAME</span>
              <input
                required
                onChange={onChangeHandler}
                name="firstName"
                value={formData.firstName}
                type="text"
                placeholder="First name"
                autoComplete="given-name"
              />
            </label>
            <label className="checkout-field">
              <span>LAST NAME</span>
              <input
                required
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
                type="text"
                placeholder="Last name"
                autoComplete="family-name"
              />
            </label>
            <label className="checkout-field checkout-field-wide">
              <span>EMAIL ADDRESS</span>
              <input
                required
                onChange={onChangeHandler}
                name="email"
                value={formData.email}
                type="email"
                placeholder="Email address"
                autoComplete="email"
              />
            </label>
            <label className="checkout-field checkout-field-wide">
              <span>STREET ADDRESS</span>
              <input
                required
                onChange={onChangeHandler}
                name="street"
                value={formData.street}
                type="text"
                placeholder="Street"
                autoComplete="street-address"
              />
            </label>
            <label className="checkout-field">
              <span>CITY</span>
              <input
                required
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
                type="text"
                placeholder="City"
                autoComplete="address-level2"
              />
            </label>
            <label className="checkout-field">
              <span>STATE</span>
              <input
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
                type="text"
                placeholder="State"
                autoComplete="address-level1"
              />
            </label>
            <label className="checkout-field">
              <span>ZIPCODE</span>
              <input
                required
                onChange={onChangeHandler}
                name="zipcode"
                value={formData.zipcode}
                type="number"
                placeholder="Zipcode"
                autoComplete="postal-code"
              />
            </label>
            <label className="checkout-field">
              <span>COUNTRY</span>
              <input
                required
                onChange={onChangeHandler}
                name="country"
                value={formData.country}
                type="text"
                placeholder="Country"
                autoComplete="country-name"
              />
            </label>
            <label className="checkout-field checkout-field-wide">
              <span>PHONE</span>
              <input
                required
                onChange={onChangeHandler}
                name="phone"
                value={formData.phone}
                type="tel"
                placeholder="Phone"
                autoComplete="tel"
              />
            </label>
          </div>
        </section>

        <aside className="checkout-summary">
          <p className="checkout-summary-kicker">02 / YOUR ORDER</p>
          <CartTotal />

          <fieldset className="checkout-payment">
            <legend>PAYMENT METHOD</legend>
            <div className="checkout-payment-options">
              <button
                type="button"
                onClick={() => setMethod("stripe")}
                className={method === "stripe" ? "is-selected" : ""}
                aria-pressed={method === "stripe"}
              >
                <span className="checkout-radio" />
                <img src={assets.stripe_logo} alt="" />
                <span className="checkout-payment-name">CARD</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod("razorpay")}
                className={method === "razorpay" ? "is-selected" : ""}
                aria-pressed={method === "razorpay"}
              >
                <span className="checkout-radio" />
                <img src={assets.razorpay_logo} alt="" />
                <span className="checkout-payment-name">ONLINE</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod("cod")}
                className={method === "cod" ? "is-selected" : ""}
                aria-pressed={method === "cod"}
              >
                <span className="checkout-radio" />
                <span className="checkout-cod-mark">COD</span>
                <span className="checkout-payment-name">CASH ON DELIVERY</span>
              </button>
            </div>
          </fieldset>

          <button type="submit" className="checkout-submit">
            <span>PLACE ORDER</span>
            <span aria-hidden="true">↗</span>
          </button>
        </aside>
      </div>
    </form>
  );
};

export default PlaceOrder;
