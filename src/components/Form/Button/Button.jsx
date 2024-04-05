import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ children, type, btnType, label, loading, color , loadingText, event, additionalCss}) => {
    let classes = `${additionalCss}  block text-sm rounded-md font-medium  transition duration-300 ${loading ? 'cursor-not-allowed opacity-80' : 'opacity-100'} `;
    if (type === "solid" && color === 'blue') {
        classes += `  w-full  bg-blue-700 hover:bg-blue-600  p-3 text-center text-white   active:bg-blue-600 `;
    }
    if (type === "outlined" && color === 'blue') {
        classes += `  w-full  border border-blue-700 text-blue-700  p-3 text-center   hover:bg-blue-600 active:bg-blue-600 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-blue-300 dark:active:bg-blue-300 dark:hover:text-white `;
    }
    if (type === "solid" && color === 'gray') {
        classes += `  w-full  bg-gray-800 hover:bg-gray-700 text-white  p-3 text-center   active:bg-gray-700 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-800 dark:active:bg-gray-100 `;
    }
    if (type === "outlined" && color === 'gray') {
        classes += `  w-full  border border-gray-700 text-gray-700 text-gray-700  p-3  text-center   hover:bg-gray-600 hover:text-white active:bg-gray-600 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-600 dark:hover:text-gray-300 `;
    }
    if (type === "underline" && color === 'blue') {
        classes += ` text-blue-700 border-b  rounded-none  text-left border-blue-700 hover:border-blue-600 active:border-blue-600 dark:border-blue-300 dark:text-blue-300 p-0 w-auto `;
    }
    if (type === "underline" && color === 'gray') {
        classes += ` text-gray-700 border-b rounded-none text-left border-gray-800 hover:border-gray-600 active:border-gray-600 p-0  w-auto dark:border-gray-300 dark:text-gray-300 `;
    }
    if (type === "nav" && color === 'blue') {
        classes += ` text-blue-700  text-left rounded-none hover:border-blue-600 active:border-blue-600 dark:border-blue-300 dark:text-blue-300 p-0 w-auto `;
    }
    if (type === "nav" && color === 'gray') {
        classes += ` text-gray-700 p-0 text-left  rounded-none hover:border-gray-600 active:border-gray-600  w-auto dark:border-gray-300 dark:text-gray-300 `;
    }
    return (
        <>
        {event && (<button type={btnType} className={classes} onClick={event}>
               {children} {loading ? loadingText : label}
            </button>) }

            {!event && (<button type={btnType} className={classes} onClick={event}>
                {children} {loading ? loadingText : label}
            </button>) }
            
        </>
    )
}
Button.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    btnType: PropTypes.string.isRequired,
    label: PropTypes.string,
    loading: PropTypes.bool,
    loadingText:PropTypes.string
};
Button.defaultProps = {
    color: "blue",
    type: "solid",
    btnType:"button",
    loading:false,
    additionalCss: '',
    loadingText:'Sending...'
};
export default Button;