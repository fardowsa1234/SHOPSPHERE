import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './style.scss';
import { formatPrice } from '../../utils/helpers';

const Checkout = () => {
  const { state } = useLocation();
  const [cartItems, setCartItems] = useState(state?.cartItems || []);

  const handleCheckout = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    alert('Thank you for shopping with us:Order completed!');
  };

  const updateQuantity = (id, type) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQty = type === "INC" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { 
          ...item, 
          quantity: newQty,
          totalPrice: item.discountedPrice * newQty
        };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const EmptyCart = () => (
    <div className="checkout-empty-cart">
      <h4>No items in Cart</h4>
      <Link to="/" className="checkout-btn-primary">
        Go Shopping Now
      </Link>
    </div>
  );

  const OrderSummary = () => {
    const subtotal = calculateTotal();
    const shipping = 2;
    const total = subtotal + shipping;

    return (
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="checkout-summary-item">
            <div className="item-details">
              <img src={item.thumbnail} alt={item.title} className="item-image" />
              <div>
                <h3>{item.title}</h3>
                <p>{formatPrice(item.discountedPrice)} each</p>
              </div>
            </div>
            <div className="item-actions">
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, "DEC")}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, "INC")}>+</button>
              </div>
              <button className="remove-item" onClick={() => removeItem(item.id)}>Delete</button>
            </div>
            <div className="item-total">
              {formatPrice(item.totalPrice)}
            </div>
          </div>
        ))}
        <div className="checkout-summary-total">
          <div>Subtotal</div>
          <div>{formatPrice(subtotal)}</div>
        </div>
        <div className="checkout-summary-total">
          <div>Shipping</div>
          <div>{formatPrice(shipping)}</div>
        </div>
        <div className="checkout-summary-total">
          <div>Total</div>
          <div>{formatPrice(total)}</div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => (
    <div className="checkout-container">
      <OrderSummary />
      <div className="checkout-form-container">
        <h2>Billing Information</h2>
        <form className="checkout-form" onSubmit={handleCheckout}>
          <div className="checkout-form-row">
            <div className="checkout-form-group">
              <label htmlFor="firstName">First name</label>
              <input type="text" id="firstName" name="firstName" required />
            </div>
            <div className="checkout-form-group">
              <label htmlFor="lastName">Last name</label>
              <input type="text" id="lastName" name="lastName" required />
            </div>
          </div>
          <div className="checkout-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="checkout-form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" required />
          </div>
          <div className="checkout-form-group">
            <label htmlFor="address2">Address 2 (Optional)</label>
            <input type="text" id="address2" name="address2" />
          </div>
          <div className="checkout-form-row">
            <div className="checkout-form-group">
              <label htmlFor="country">Country</label>
              <select id="country" name="country" required>
                <option value="">Choose...</option>
                <option>Kenya</option>
              </select>
            </div>
            <div className="checkout-form-group">
              <label htmlFor="state">State</label>
              <select id="state" name="state" required>
                <option value="">Choose...</option>
                <option>Nairobi</option>
              </select>
            </div>
            <div className="checkout-form-group">
              <label htmlFor="zip">Zip</label>
              <input type="text" id="zip" name="zip" required />
            </div>
          </div>
          <h2>Payment Information</h2>
          <div className="checkout-form-row">
            <div className="checkout-form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input type="text" id="cardNumber" name="cardNumber" required />
            </div>
            <div className="checkout-form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required />
            </div>
            <div className="checkout-form-group">
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" name="cvv" required />
            </div>
          </div>
          <button className="checkout-btn-primary" type="submit">
            Complete Order
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="checkout-page">
      {cartItems.length === 0 ? <EmptyCart /> : <ShowCheckout />}
    </div>
  );
};

export default Checkout;