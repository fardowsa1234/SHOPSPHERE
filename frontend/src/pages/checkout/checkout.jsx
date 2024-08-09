import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './style.scss'; // Adjust the path based on your file structure

const Checkout = () => {
  const { state } = useLocation();
  const cartItems = state?.cartItems || [];

  // Handle form submission
  const handleCheckout = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log(data); // Log form data or send it to a server
    alert('Checkout successful!');
  };

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">No item in Cart</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    cartItems.forEach(item => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})<span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>${Math.round(subtotal + shipping)}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Billing address</h4>
              </div>
              <div className="card-body">
                <form className="needs-validation" noValidate onSubmit={handleCheckout}>
                  <div className="row g-3">
                    {/* Billing Information */}
                    <div className="col-sm-6 my-1">
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>

                    <div className="col-sm-6 my-1">
                      <label htmlFor="lastName" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                      </div>
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="1234 Main St"
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your shipping address.
                      </div>
                    </div>

                    <div className="col-12 my-1">
                      <label htmlFor="address2" className="form-label">
                        Address 2 <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        name="address2"
                        placeholder="Apartment or suite"
                      />
                    </div>

                    <div className="col-md-5 my-1">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <select className="form-select" id="country" name="country" required>
                        <option value="">Choose...</option> <br />
                        <option>Kenya</option> <br />
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>

                    <div className="col-md-4 my-1">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <select className="form-select" id="state" name="state" required>
                        <option value="">Choose...</option> <br />

                        <option>Nairobi</option> <br />
                      </select>
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>

                    <div className="col-md-3 my-1">
                      <label htmlFor="zip" className="form-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        name="zip"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        Zip code required.
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="col-md-6 my-1">
                      <label htmlFor="cardNumber" className="form-label">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="Card Number"
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your card number.
                      </div>
                    </div>

                    <div className="col-md-6 my-1">
                      <label htmlFor="expiryDate" className="form-label">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your card's expiry date.
                      </div>
                    </div>

                    <div className="col-md-6 my-1">
                      <label htmlFor="cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        name="cvv"
                        placeholder="CVV"
                        required
                      />
                      <div className="invalid-feedback">
                        CVV required.
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <button className="w-100 btn btn-primary" type="submit">
                    Continue to checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {cartItems.length === 0 ? <EmptyCart /> : <ShowCheckout />}
    </div>
  );
};

export default Checkout;
