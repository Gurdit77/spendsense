import React from 'react';
import PropTypes from 'prop-types';
function Text({children , className}) {
  return (
    <>
    {className === "" && (<p className={' transition duration-300 font-semibold text-md  leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white '}>
        {children}
     </p>     )}
     {className !== "" && (<p className={className}>
        {children}
     </p>     )}
     </>
  );
}

Text.propTypes={
    className: PropTypes.string
}
Text.defaultProps = {
    className: ''
  };
export default Text;
