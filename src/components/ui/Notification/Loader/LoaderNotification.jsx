import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text from '../../Text/Text';
import Button from '../../../Form/Button/Button';
import Icon from '../../Icons/Icon';
function LoaderNotification({children,message, className, active}) {
    const [activeNoti,setActiveNoti] = useState(active);
    const hide = ()=>{
        setActiveNoti(false);
    }
    useEffect(()=>{
        setActiveNoti(active);
    },[active])
    
  return (
   <div className={className + 'fixed top-20 right-4  max-w-96 w-full sm:p-3 transition-all flex justify-between duration-500 bg-blue-700 rounded-lg shadow dark:border md:mt-0 l:p-0 dark:bg-blue-700 dark:border-gray-700' + `${activeNoti === true ? ' opacity-1 translate-y-0' : ' cursor-not-allowed pointer-events-none opacity-0 translate-y-7 transition-all'}` }>
    <Text className="flex-1 text-white">
        {children}
        {message}
    </Text>
    <Button btnType='button' type="nav" color="grey" event={setActiveNoti}>
        <Icon type="close" size="24px" colorClass="fill-white"/>
        </Button>
   </div>
  );
}
LoaderNotification.propTypes = {
    children: PropTypes.string,
    message: PropTypes.string,
    className: PropTypes.string
};
LoaderNotification.defaultProps = {    
    className: ''
};
export default LoaderNotification;
