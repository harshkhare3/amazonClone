import React, { useState, useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { Link, Redirect } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { getBasketTotal } from '../reducer';
import axios from '../axios';
import {useHistory} from 'react-router-dom';

import './Payment.css';
import { db } from '../firebase';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generates a special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const basketTotal = getBasketTotal(basket)*100;
      const response = await axios({
        method: 'post',
        // Stripes expects the total in a currencies subunits ( $1 will be written as 100cents)
        url: `/payments/create?total=${basketTotal}`
      });

      setClientSecret(response.data.clientSecret);
    }

    getClientSecret();
  }, [basket])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then((response) => {
      //response.paymentIntent = Payment Confirmation 
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(response.paymentIntent.id)
        .set({
          basket: basket,
          amount: response.paymentIntent.amount,
          created: response.paymentIntent.created
      })

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: 'EMPTY_BASKET'
      });

      history.replace('/orders')
    })
  }

  const handleChange = event => {
    // Listen for changes in the CardElement and display any errors as the customer types the card details

    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>321 Dummy Road,</p>
            <p>React, Adelaide</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map(item => (
              <CheckoutProduct
                key={Math.random()}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total : {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>

      </div>    
    </div>
  )
}

export default Payment
