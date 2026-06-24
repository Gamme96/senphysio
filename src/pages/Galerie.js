import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './Galerie.css';
import { Helmet } from 'react-helmet';

const smallImages = [
  `${process.env.PUBLIC_URL}/mobile_images/gallerie/DSC04992.webp`,
  `${process.env.PUBLIC_URL}/mobile_images/gallerie/DSC05480.webp`,
  `${process.env.PUBLIC_URL}/mobile_images/gallerie/DSC05155.webp`,
  `${process.env.PUBLIC_URL}/mobile_images/gallerie/DSC05433.webp`,
  `${process.env.PUBLIC_URL}/mobile_images/gallerie/DSC04943.webp`,
  `${process.env.PUBLIC_URL}/mobile_images/gallerie/DSC04831.webp`,
];

const largeImages = [
  `${process.env.PUBLIC_URL}/desktop_images/gallerie/DSC04992.webp`,
  `${process.env.PUBLIC_URL}/desktop_images/gallerie/DSC05480.webp`,
  `${process.env.PUBLIC_URL}/desktop_images/gallerie/DSC05155.webp`,
  `${process.env.PUBLIC_URL}/desktop_images/gallerie/DSC05433.webp`,
  `${process.env.PUBLIC_URL}/desktop_images/gallerie/DSC04943.webp`,
  `${process.env.PUBLIC_URL}/desktop_images/gallerie/DSC04831.webp`,
];

function Galerie({ cookiesAccepted }) {
  const [isBlurred, setIsBlurred] = useState(!cookiesAccepted);
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    setIsBlurred(!cookiesAccepted);
  }, [cookiesAccepted]);

  useEffect(() => {
    const updateImages = () => {
      if (window.innerWidth < 768) {
        setImages(smallImages);
      } else {
        setImages(largeImages);
      }
    };

    updateImages();
    window.addEventListener('resize', updateImages);

    return () => {
      window.removeEventListener('resize', updateImages);
    };
  }, []);

  const openImage = (index) => {
    setSelectedImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImageIndex(null);
  };

  const showPreviousImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <Helmet>
        <title>Galerie | Sen Physiotherapie</title>
      </Helmet>

      <Navbar isBlurred={isBlurred} />

      <div className={`galerie-container ${isBlurred ? 'blurred' : ''}`}>
        <h1 className="galerie-title">Galerie</h1>

       

        <div className="galerie-grid">
          {images.map((image, index) => (
            <button
              key={index}
              className="galerie-item"
              onClick={() => openImage(index)}
              type="button"
            >
              <img
                src={image}
                alt={`Praxisbild ${index + 1}`}
                loading="lazy"
                className="galerie-image"
              />
            </button>
          ))}
        </div>
      </div>

      {selectedImageIndex !== null && (
        <div className="galerie-lightbox" onClick={closeImage}>
          <button
            className="galerie-lightbox-close"
            onClick={closeImage}
            type="button"
            aria-label="Galerie schließen"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                className="galerie-lightbox-arrow galerie-lightbox-arrow-left"
                onClick={(e) => {
                  e.stopPropagation();
                  showPreviousImage();
                }}
                type="button"
                aria-label="Vorheriges Bild"
              >
                &#10094;
              </button>

              <button
                className="galerie-lightbox-arrow galerie-lightbox-arrow-right"
                onClick={(e) => {
                  e.stopPropagation();
                  showNextImage();
                }}
                type="button"
                aria-label="Nächstes Bild"
              >
                &#10095;
              </button>
            </>
          )}

          <div
            className="galerie-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImageIndex]}
              alt={`Praxisbild ${selectedImageIndex + 1}`}
              className="galerie-lightbox-image"
            />
          </div>
        </div>
      )}

      <Footer isBlurred={isBlurred} />
    </>
  );
}

export default Galerie;