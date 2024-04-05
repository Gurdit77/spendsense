import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Radio = ({  required, label, setData, value, name, index }) => {
   
    return (
        <>

            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-500">
    <input required={required} checked={value} id={"bordered-radio-" + index} type="radio" name={name} onChange={(e) => { setData(e.target.checked) }}
    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label for={"bordered-radio-" + index} className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
</div>      
        </>
    )
}
Radio.propTypes = {
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    setData:PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};
Radio.defaultProps = {
    placeholder: "blue",
    required: false,
    label: "Email"
};
export default Radio;