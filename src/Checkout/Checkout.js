import React, { useState, useEffect } from 'react'
import Ad from '../images/amazon_ad.jpg'
import './Checkout.css';
import Subtotal from '../Subtotal/Subtotal';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { useStateValue } from '../StateProvider';
import { getBasketTotal } from '../reducer';

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if(getBasketTotal(basket) == 0){
      setDisabled(true);
    }
    else{
      setDisabled(false);
    }
    console.log(basket.length);

  }, [basket.length])

  return (
   <div className='checkout'>
    <div className="checkout__left">
      <img
       src={Ad}
       alt="Amazon Ad" 
       className="checkout__ad"
      />

      <div>
        <h3>Hello, {!user ? 'Guest' : user.email}</h3>
        <h2 className="checkout__title">Your Shopping Basket</h2>
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

    <div className="checkout__right">
      <Subtotal disabled={disabled}/>
    </div>
   </div>
  )
}

export default Checkout
