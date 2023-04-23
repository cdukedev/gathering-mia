import React from "react";

const GalleryItem = ({ src, alt, text }) => (
  <div className="gallery__item">
    {text && <span className="gallery__item-text">{text}</span>}
    <img className="gallery__item-image" src={src} alt={alt} />
  </div>
);

export default GalleryItem;
