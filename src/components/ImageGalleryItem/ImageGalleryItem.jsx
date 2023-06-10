import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'
const ImageGalleryItem = ({
  description,
  smallImage,
  largeImage,
  openModal,
}) => {
  return (
    <li className={css.imgBox} onClick={openModal}>
      <img className={css.img_look} src={smallImage} alt={description} data-large={largeImage} />
    </li>
  );
};

ImageGalleryItem.prototype = {
  description: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
