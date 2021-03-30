import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import Logo from '../images/amazon_logo.png';
import { auth } from '../firebase';

import './Header.css';

function Header() {
  const [{basket, user}, dispatch] = useStateValue();

  const handleAuthentication = () =>{
    if(user) {
      auth.signOut();
    }
  }

  return (
    <div className='header'>
      <Link to="/">
        <img 
          className="header__logo"
          src={Logo} 
          alt="Amazon Logo" 
        />
      </Link>
      
      <div className="header__search">
        <input
          type="text"
          className="header__searchInput"/>
        <SearchIcon
          fontSize="large"
          className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={user? '/' : '/login'}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">Hello {user? user.email : 'Guest'}</span>
            <span className="header__optionLineTwo">{user? 'Sign Out' : 'Sign in'}</span>
          </div>
        </Link>

        <Link to={user? '/orders' : '/login'}>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionTwo header__basketCount">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header