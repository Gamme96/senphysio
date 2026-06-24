import React, { useEffect, useState } from 'react';
import './Slideshow.css';

const smallImages = [
  `${process.env.PUBLIC_URL}/mobile_images/slideshow/DSC04993.webp`,
  `${process.env.PUBLIC_URL}/mobile_images/slideshow/DSC04668.webp`,
  `${process.env.PUBLIC_URL}/mobile_images/slideshow/DSC05374.webp`,

];

const largeImages = [
  `${process.env.PUBLIC_URL}/desktop_images/slideshow/DSC04993.webp`,
  `${process.env.PUBLIC_URL}/desktop_images/slideshow/DSC04668.webp`,
  `${process.env.PUBLIC_URL}/desktop_images/slideshow/DSC05374.webp`,

];

function Slideshow({ isBlurred }) {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    let isMounted = true;

   

    const preloadImages = async (imageList) => {
      const promises = imageList.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      await Promise.all(promises);
    };

    const setupImages = async () => {
      const mobileNow = window.innerWidth < 768;
      const selectedImages = mobileNow ? smallImages : largeImages;

      setIsMobile(mobileNow);
      setIsReady(false);
      setCurrentImageIndex(0);

      await preloadImages(selectedImages);

      if (!isMounted) return;

      setImages(selectedImages);
      setIsReady(true);
      setResetTrigger((prev) => prev + 1);
    };

    setupImages();

    const handleResize = () => {
      setupImages();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isReady || images.length <= 1) return;

    const timeout = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [currentImageIndex, isReady, images.length, resetTrigger]);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setResetTrigger((prev) => prev + 1);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setResetTrigger((prev) => prev + 1);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
    setResetTrigger((prev) => prev + 1);
  };

  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;

    if (distance > minSwipeDistance) {
      goToNextImage();
    } else if (distance < -minSwipeDistance) {
      goToPreviousImage();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className={`slideshow ${isBlurred ? 'blurred' : ''}`}>
      <div
        className="slideshow-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slideshow-wrapper">
          {images.map((image, index) => (
            <div
              key={image}
              className={`slideshow-slide ${
                index === currentImageIndex ? 'slideshow-slide-active' : ''
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>

        {images.length > 1 && (
          <div className="slideshow-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`slideshow-dot ${
                  index === currentImageIndex ? 'active' : ''
                }`}
                onClick={() => goToImage(index)}
                aria-label={`Gehe zu Bild ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        )}

        <div className="slideshow-slogan">
          <p>Gemeinsam erreichen wir Ihre Gesundheitsziele</p>
        </div>

        <a href="/kontakt" className="slideshow-btn">
          Termin vereinbaren
        </a>
      </div>
    </div>
  );
}

export default Slideshow;