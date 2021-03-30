import React from 'react';
import { motion } from 'framer-motion';
import { useStateValue } from '../StateProvider';
import "./Product.css";

function Product({id, title, price, image, rating}) {

  const [state, dispatch] = useStateValue();

  const addToBasket = () => {
    //dispatch the item into data layer
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating
      },
    });
  }

  return (
    <motion.div className="product"
     whileHover={{ scale:1.04 }}
     transition={{ duration:0.2 }}
    >
      <div className="product__info">
        <p>{ title }</p>
        <p className="product__price">
          <small>$</small>
          <strong>{ price }</strong>
        </p>
        <div className="product__rating">
        {Array(rating)
            .fill(1)
            .map((_, i) => (
            <p key={i}>⭐</p>                
          ))}
        </div>
      </div>

      <img src={ image } alt=""/>
      
      <button onClick={addToBasket}>Add to Basket</button>
    </motion.div>
  );
}

export default  Product;   