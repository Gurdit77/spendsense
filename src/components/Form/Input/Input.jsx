import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Input = ({ type, placeholder, required, label, setData, value, name }) => {
    let classes = 'flex flex-col-reverse';    
    return (
        <>
            <div className={classes}>
                <input
                    name={name}
                    type={type}
                    autoComplete={type}
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    onChange={(e) => { setData(e.target.value) }}
                    className="bg-gray-50 border transition duration-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label className="block mb-2 text-sm  transition duration-300 font-medium text-gray-900 dark:text-white">
                    {label}
                </label>
            </div>
        </>
    )
}
Input.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    setData:PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};
Input.defaultProps = {
    placeholder: "blue",
    type: "text",
    required: false,
    label: "Email"
};
export default Input;