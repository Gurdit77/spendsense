import React from 'react';
import PropTypes from 'prop-types';
import './Container.css';
const Head = ({ tag, color, size, font, children })=> {
  const Tag = tag;
  return <Tag className={`${color} ${size} ${font}`}>{children}</Tag>;
}

const Container = ({ tag, text, style })=> {
  return (
      <>
          <Head tag={tag} children={text} className={style} />
      </>
  );
}

Container.propTypes = {
    tag: PropTypes.string.isRequired,
    text: PropTypes.string,
    style: PropTypes.string,
};
Container.defaultProps = {
    text: "Add Text ..",
    style: "text-gray-800",
    tag:"div" 
};
export default Container;