import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router';
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import './Subtotal.css';

function Subtotal({ disabled }) {
  const history = useHistory();
  const [state, dispatch] = useStateValue();
  
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({state.basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(state.basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button disabled={disabled} onClick={state.user? e => history.push('/payment') : e => history.push('/login')}>Proceed to Checkout</button> 
    </div>
  )
}

export default Subtotal
