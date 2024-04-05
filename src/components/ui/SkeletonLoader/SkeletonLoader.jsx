import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
function SkeletonLoader({type, height, width, styles, lines}) {
  return (
    <>
{type === 'multiline' && (
      <div role="status" className={ styles + " animate-pulse w-full"}>
        {Array.apply(0, Array(lines)).map(function (x, i) {
    return <div key={i} className={ height + "  bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-3"}></div>;
  })}
  <div className={ height + "  bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 "}></div>
    
</div>
)}
{type === 'line' && (
      <div role="status" className={  styles + " flex items-center max-w-sm w-full animate-pulse"}>
    <div className={ height + " bg-gray-200 rounded-full dark:bg-gray-700 " + width}></div>
</div>
)}
    </>
  );
}
SkeletonLoader.propTypes = {
    type: PropTypes.string,
    height: PropTypes.string
};
SkeletonLoader.defaultProps = {
    height: "h-2.5",
    width:"w-full"
};
export default SkeletonLoader;
