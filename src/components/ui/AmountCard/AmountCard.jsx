import React from 'react';
import Heading from '../Heading/Heading';
import NavButton from '../NavButton/NavButton';
import PropTypes from 'prop-types';
import Currency from 'react-currency-formatter';
import { storeCurrency } from '../../../server/Data';

function AmountCard({heading,amount,link, over}) {
  return (
   <div className={'bg-gradient-to-r from-cyan-500 to-blue-500 flex-1 rounded-md p-6' + `${heading === "Balance - This Month" ? over ? ' from-red-500 to-red-700' :' from-green-500 to-green-700' : ''}`}>
    <NavButton type="nav" link={link}>
        <Heading text={heading} headingStyle="h6" />
        <Heading headingStyle="h1Class" >
        <Currency
                quantity={amount}
                currency={storeCurrency}
              />
        </Heading>
        </NavButton>
   </div>
  );
}
AmountCard.propTypes ={
  link: PropTypes.string
}
AmountCard.defaultProps = {
  link: '/'
};
export default AmountCard;
