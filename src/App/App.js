import React, { useEffect } from 'react';
import "./App.css";
import Header from '../Header/Header';
import { motion } from 'framer-motion';
import Home from '../Home/Home';
import Checkout from '../Checkout/Checkout';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../Login/Login';
import { auth } from '../firebase';
import { useStateValue } from '../StateProvider'
import Payment from '../Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from '../Orders/Orders';
import Footer from '../Footer/Footer';

// Initial Stripe setup
const promise = loadStripe('pk_test_51ITUfFBDmA2boEpQJa2MzFw28TpRjjmmUdGrUx2hsdtxfhGD2hHoqL8EErrgQYADhvuOxJvWPrEnMjLiZXiaFo1c00b33Z0ch1');

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        //the user just logged in / user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      
      else {
        //User is logged out.
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  
  return (
    <Router>
      <motion.div className="App"
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:0.25, duration:0.5 }}
      >
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
              <Footer />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          {/* Default Root at the Bottom */}
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </motion.div>
    </Router>
  );
}

export default App;