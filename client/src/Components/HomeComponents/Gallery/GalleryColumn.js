import React from "react";

function GalleryColumn({ images, ...props }) {
  return (
    <div className="gallery__column" {...props}>
      {images.map((image, index) => (
        <div key={index} className="gallery__item">
          {image.text && (
            <span className="gallery__item-text">{image.text}</span>
          )}
          <img
            src={image.src}
            alt={image.alt}
            className="gallery__item-image"
          />
        </div>
      ))}
    </div>
  );
}

export default GalleryColumn;
