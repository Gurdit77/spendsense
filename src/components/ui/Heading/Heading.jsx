import React from 'react';
import './Heading.css';

const Heading = ({ children, headingStyle, text })=> {

return(
    <>
    {headingStyle === 'h1' && ( 
    <h1 className="text-3xl transition duration-300 font-semibold leading-tight whitespace-nowrap tracking-tight text-gray-900 md:text-4xl dark:text-white">{children}{text}</h1>
    )}
    {headingStyle === 'h2' && (
    <h2 className="text-2xl transition duration-300 font-semibold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">{children}{text}</h2>
    )}
     {headingStyle === 'h3' && (
    <h3 className="text-xl transition duration-300 font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">{children}{text}</h3>
    )}
     {headingStyle === 'h4' && (
    <h4 className="text-lg transition duration-300 font-semibold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">{children}{text}</h4>
    )}
     {headingStyle === 'h5' && (
    <h5 className="text-md transition duration-300 font-semibold leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white">{children}{text}</h5>
    )}
     {headingStyle === 'h6' && (
    <h6 className="text-sm transition duration-300 font-semibold leading-tight tracking-tight text-gray-900 md:text-md dark:text-white">{children}{text}</h6>
    )}
     {headingStyle === 'span' && (
    <span className="text-sm transition duration-300 font-medium leading-tight tracking-tight text-gray-900 md:text-md dark:text-white">{children}{text}</span>
    )}
    {headingStyle === 'h1Class' && ( 
    <div className="text-3xl transition duration-300 font-semibold leading-tight whitespace-nowrap tracking-tight text-gray-900 md:text-4xl dark:text-white">{children}{text}</div>
    )}
    </>
)
}

export default Heading;