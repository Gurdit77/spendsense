import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavButton.css';
const NavButton = ({ children, type, link, label , color, additionalCss, onClick , labels }) => {
    let classes = `${additionalCss}  text-sm rounded-md  font-medium  transition-all duration-300`;
    if (type === "solid" && color === 'blue') {
        classes += ` w-full p-3 text-white block  text-center bg-blue-700 hover:bg-blue-600 active:bg-blue-600 `;
    }
    if (type === "outlined" && color === 'blue') {
        classes += ` w-full p-3 text-blue-700 block  text-center border border-blue-700 text-blue-700 hover:text-white hover:bg-blue-600 active:bg-blue-600 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-blue-300 dark:active:bg-blue-300 dark:hover:text-white`;
    }
    if (type === "solid" && color === 'gray') {
        classes += ` w-full p-3 text-white block  text-center bg-gray-800 hover:bg-gray-700 active:bg-gray-700 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-800 dark:active:bg-gray-100`;
    }
    if (type === "outlined" && color === 'gray') {
        classes += ` w-full p-3 text-gray-800 block  text-center border border-gray-700 text-gray-700 hover:bg-gray-600 hover:text-white active:bg-gray-600 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-600 dark:hover:text-gray-300`;
    }
    if (type === "underline" && color === 'blue') {
        classes += ` text-blue-700 border-b  text-center  rounded-none border-blue-700 hover:border-blue-600 active:border-blue-600 dark:border-blue-300 dark:text-blue-300 p-0 w-auto`;
    }
    if (type === "underline" && color === 'gray') {
        classes += ` text-gray-700 border-b  text-center rounded-none border-gray-800 hover:border-gray-600 active:border-gray-600 p-0  w-auto dark:border-gray-300 dark:text-gray-300`;
    }
    if (type === "nav" && color === 'blue') {
        classes += ` text-blue-700   rounded-none hover:border-blue-600 active:border-blue-600 dark:border-blue-300 dark:text-blue-300 p-0 w-auto`;
    }
    if (type === "nav" && color === 'gray') {
        classes += ` text-gray-700 rounded-none hover:border-gray-600 active:border-gray-600 p-0  w-auto dark:border-gray-300 dark:text-gray-300`;
    }

    return (
        <>
            <Link to={link} className={classes} >
                {children} {label}
            </Link>
        </>
    )
}
NavButton.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    link: PropTypes.string.isRequired,
    label: PropTypes.string
};
NavButton.defaultProps = {
    color: "blue",
    type: "solid",
    additionalCss:'block'
};
export default NavButton;