import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);

  return (
    <div className="cart-totals">
      <h2>CART TOTALS</h2>

      <div className="cart-total-rows">
            <div className="cart-total-row">
                <p>Subtotal</p>
                <p>{currency} {getCartAmount()}.00</p>
            </div>
            <div className="cart-total-row">
                <p>Shipping Fee</p>
                <p>{currency} {delivery_fee}.00</p>
            </div>
            <div className="cart-total-row cart-total-final">
                <b>Total</b>
                <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
            </div>
      </div>
    </div>
  )
}

export default CartTotal
