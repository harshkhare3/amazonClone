import React, { useEffect, useState } from 'react';
import { Carousel }from 'react-bootstrap';
import Banner from '../images/amazon_banner1.jpg';
import Banner2 from '../images/amazon_banner2.jpg';
import Banner3 from '../images/amazon_banner3.jpg';
import AmazonEcho from '../images/amazon_echo.jfif';
import Tv from '../images/tv.jpg';
import iPad from '../images/ipad.jpg';
import Watch from '../images/watch.jpg';
import Startup from '../images/startup.jpg';
import Mix from '../images/mix.jpg';
import Product from '../Product/Product';
import { useStateValue } from '../StateProvider';
import "./Home.css";

function Home() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [products, setProducts] = useState([]);

  return (
    <div className="home">
      <div className="home__container">
        <Carousel className="home__carousel">
          <Carousel.Item>
            <img
              className="home__image"
              src={ Banner }
              alt="Amazon Banner"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="home__image"
              src={ Banner2 }
              alt="Amazon Banner"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="home__image"
              src={ Banner3 }
              alt="Amazon Banner"
            />
          </Carousel.Item>
        </Carousel>
        
        <div className="home__row">
            <Product
              id="12321341"
              title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
              price={11.96}
              rating={5}
              image={ Startup }
            />
          
          <Product
            id="49538094"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={239.0}
            rating={4}
            image={ Mix }
          />
        </div>

        <div className="home__row">
          <Product
            id="4903850"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            price={199.99}
            rating={3}
            image={ Watch }
          />
          <Product
            id="23445930"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={5}
            image={ AmazonEcho }
          />
          <Product
            id="3254354345"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={598.99}
            rating={4}
            image={ iPad }
          />
        </div>

        <div className="home__row">
          <Product
            id="90829332"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1094.98}
            rating={4}
            image={ Tv }
          />
        </div>
      </div>   
    </div>
  )
}

export default Home